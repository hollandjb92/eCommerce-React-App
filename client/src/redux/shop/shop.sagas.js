//saga code is composed of effects
import {
  takeLatest,
  call,
  put,
  all
} from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import {
  firestore,
  convertCollectionsSnapshotToMap
} from '../../firebase/firebase.utils';
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection("collections");
    const snapshot = yield collectionRef.get();
    //call effect invokes functions with parameters as subsequent arguments. must be yielded
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    //put - the saga effect for creating actions ( as opposed to dispatch, must be yielded)
    yield put(fetchCollectionsSuccess(collectionsMap))

  } catch (err) {
    yield put(fetchCollectionsFailure(err.message))
  }



  // collectionRef.get().then(snapshot => {
  //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
  //   dispatch(fetchCollectionsSuccess(collectionsMap));
  // }).catch(err => dispatch(fetchCollectionsFailure(err.message)));
}

//pauses whenever a specific action type comes in
export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas() {
  yield all([call(fetchCollectionsStart)])
}