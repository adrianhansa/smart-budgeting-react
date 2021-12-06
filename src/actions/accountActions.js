import axios from "axios";
import {
  ADD_ACCOUNT_FAIL,
  ADD_ACCOUNT_REQUEST,
  ADD_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  GET_ACCOUNTS_FAIL,
  GET_ACCOUNTS_REQUEST,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNT_REQUEST,
  GET_ACCOUNT_SUCCESS,
  GET_ACCOUNT_FAIL,
  UPDATE_ACCOUNT_FAIL,
  UPDATE_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_SUCCESS,
} from "../constants/accountContants";

export const getAccounts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACCOUNTS_REQUEST });
    const { data } = await axios.get("http://localhost:5000/accounts");
    dispatch({ type: GET_ACCOUNTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACCOUNTS_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAccounts = () => async (dispatch) => {
  try {
    dispatch({ type: GET_ACCOUNTS_REQUEST });
    const { data } = await axios.get("http://localhost:5000/accounts");
    dispatch({ type: GET_ACCOUNTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACCOUNTS_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
