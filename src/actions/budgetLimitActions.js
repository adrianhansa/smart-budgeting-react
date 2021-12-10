import axios from "axios";
import {
  ADD_BUDGET_LIMIT_FAIL,
  ADD_BUDGET_LIMIT_REQUEST,
  ADD_BUDGET_LIMIT_SUCCESS,
  DELETE_BUDGET_LIMIT_FAIL,
  DELETE_BUDGET_LIMIT_REQUEST,
  DELETE_BUDGET_LIMIT_SUCCESS,
  GET_BUDGET_LIMITS_FAIL,
  GET_BUDGET_LIMITS_REQUEST,
  GET_BUDGET_LIMITS_SUCCESS,
  GET_BUDGET_LIMIT_FAIL,
  GET_BUDGET_LIMIT_REQUEST,
  GET_BUDGET_LIMIT_SUCCESS,
  UPDATE_BUDGET_LIMIT_FAIL,
  UPDATE_BUDGET_LIMIT_REQUEST,
  UPDATE_BUDGET_LIMIT_SUCCESS,
} from "../constants/budgetConstants";

export const getBudgetLimit = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BUDGET_LIMIT_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/budget-limits/${id}`
    );
    dispatch({ type: GET_BUDGET_LIMIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_BUDGET_LIMIT_FAIL,
      payload:
        error.respose.data.message && error.message
          ? error.respose.data.message
          : error.message,
    });
  }
};

export const getBudgetLimits = (month, year) => async (dispatch) => {
  try {
    dispatch({ type: GET_BUDGET_LIMITS_REQUEST });
    const result = await axios.get(
      `http://localhost:5000/budget-limits/${month}/${year}`
    );
    dispatch({ type: GET_BUDGET_LIMITS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_BUDGET_LIMITS_FAIL,
      payload:
        error.respose.data.message && error.message
          ? error.respose.data.message
          : error.message,
    });
  }
};

export const addBudgetLimit =
  (account, { limit, date }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_BUDGET_LIMIT_REQUEST });
      const month = Number(date.split("-")[1]);
      const year = Number(date.split("-")[0]);
      const { data } = await axios.post(
        `http://localhost:5000/budget-limits/`,
        { account, limit, month, year }
      );
      dispatch({ type: ADD_BUDGET_LIMIT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_BUDGET_LIMIT_FAIL,
        payload:
          error.respose.data.message && error.message
            ? error.respose.data.message
            : error.message,
      });
    }
  };

export const updateBudgetLimit =
  (id, { limit, month, year }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_BUDGET_LIMIT_REQUEST });
      const { data } = await axios.put(
        `http://localhost:5000/budget-limits/${id}`,
        { limit, month, year }
      );
      dispatch({ type: UPDATE_BUDGET_LIMIT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_BUDGET_LIMIT_FAIL,
        payload:
          error.respose.data.message && error.message
            ? error.respose.data.message
            : error.message,
      });
    }
  };

export const deleteBudgetLimit = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BUDGET_LIMIT_REQUEST });
    const { data } = await axios.delete(
      `http://localhost:5000/budget-limits/${id}`
    );
    dispatch({ type: DELETE_BUDGET_LIMIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_BUDGET_LIMIT_FAIL,
      payload:
        error.respose.data.message && error.message
          ? error.respose.data.message
          : error.message,
    });
  }
};
