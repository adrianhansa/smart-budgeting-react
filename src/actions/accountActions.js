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

export const getAccount = (slug) => async (dispatch) => {
  try {
    dispatch({ type: GET_ACCOUNT_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/accounts/${slug}`);
    dispatch({ type: GET_ACCOUNT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_ACCOUNT_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addAccount =
  ({ name }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_ACCOUNT_REQUEST });
      const { data } = await axios.post(`http://localhost:5000/accounts/`, {
        name,
      });
      dispatch({ type: ADD_ACCOUNT_SUCCESS, payload: data });
      const result = await axios.get("http://localhost:5000/accounts");
      dispatch({ type: GET_ACCOUNTS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_ACCOUNT_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateAccount =
  (slug, { name }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_ACCOUNT_REQUEST });
      const { data } = await axios.put(
        `http://localhost:5000/accounts/${slug}`,
        { name }
      );
      dispatch({ type: UPDATE_ACCOUNT_SUCCESS, payload: data });
      const result = await axios.get("http://localhost:5000/accounts");
      dispatch({ type: GET_ACCOUNTS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_ACCOUNT_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteAccount = (slug) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ACCOUNT_REQUEST });
    const { data } = await axios.delete(
      `http://localhost:5000/accounts/${slug}`
    );
    dispatch({ type: DELETE_ACCOUNT_SUCCESS, payload: data });
    const result = await axios.get("http://localhost:5000/accounts");
    dispatch({ type: GET_ACCOUNTS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_ACCOUNT_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
