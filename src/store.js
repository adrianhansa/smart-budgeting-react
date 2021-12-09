import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer, addUserReducer } from "./reducers/userReducers";
import { accountReducer, accountsReducer } from "./reducers/accountReducers";

const authFromLocalStorage = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {};

const initialState = { auth: authFromLocalStorage };

const rootReducer = combineReducers({
  auth: authReducer,
  addedUser: addUserReducer,
  accountDetails: accountReducer,
  accountList: accountsReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
