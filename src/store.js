import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  authReducer,
  addUserReducer,
  usersReducer,
} from "./reducers/userReducers";
import { accountReducer, accountsReducer } from "./reducers/accountReducers";
import {
  budgetLimitReducer,
  budgetLimitsReducer,
} from "./reducers/budgetReducers";

const authFromLocalStorage = localStorage.getItem("auth")
  ? JSON.parse(localStorage.getItem("auth"))
  : {};

const initialState = { auth: authFromLocalStorage };

const rootReducer = combineReducers({
  auth: authReducer,
  userList: usersReducer,
  addedUser: addUserReducer,
  accountDetails: accountReducer,
  accountList: accountsReducer,
  budgetLimit: budgetLimitReducer,
  budgetLimits: budgetLimitsReducer,
});

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
