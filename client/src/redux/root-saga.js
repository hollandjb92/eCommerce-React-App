import {
  all,
  call
} from "redux-saga/effects";
import {
  shopSagas
} from "./shop/shop.sagas";
import {
  userSagas
} from "./user/user.sagas";
import {
  cartSagas
} from "./cart/cart-sagas";



export default function* rootSaga() {
  //call all sagas on separate task streams concurrently
  yield all([
    call(shopSagas), call(userSagas), call(cartSagas)
  ])
}