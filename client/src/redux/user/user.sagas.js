import {
  takeLatest,
  put,
  all,
  call
} from 'redux-saga/effects'
import UserActionTypes from './user.types'
import {
  googleProvider,
  auth,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils'
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  signUpSuccess
} from './user.actions';


export function* getSnapspotFromUserAuth(userAuth, additionalInfo) {
  try {
    const userRef = yield call(createUserProfileDocument, userAuth, additionalInfo)

    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({
      id: userSnapshot.id,
      ...userSnapshot.data()
    }))
  } catch (error) {
    yield put(signInFailure(error))
  }
}


export function* signInWithGoogle() {
  try {
    const {
      user
    } = yield auth.signInWithPopup(googleProvider);
    yield getSnapspotFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error))
  }
}


export function* signInWithEmail({
  payload: {
    email,
    password
  }
}) {
  try {
    const {
      user
    } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapspotFromUserAuth(user)
  } catch (error) {
    yield put(signInFailure(error))
  }
}

//listener that listens to start of API call, pass it object it needs for auth
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}


export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;

    yield getSnapspotFromUserAuth(userAuth)
  } catch (err) {
    yield put(signInFailure(err))
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess())
  } catch (err) {
    yield put(signOutFailure())
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut)
}


export function* signUp({
  payload: {
    email,
    password,
    displayName
  }
}) {
  try {
    const {
      user
    } = yield auth.createUserWithEmailAndPassword(
      email,
      password
    );
    yield put(signUpSuccess({
      user,
      additionalInfo: {
        displayName
      }
    }));
  } catch (err) {
    yield put(signUpFailure(err))
  }
}

export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* signInAfterSignUp({
  payload: {
    user,
    additionalInfo
  }
}) {
  yield getSnapspotFromUserAuth(user, additionalInfo)
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onEmailSignInStart), call(isUserAuthenticated), call(onSignOutStart), call(onSignUpStart), call(onSignUpSuccess)])
}