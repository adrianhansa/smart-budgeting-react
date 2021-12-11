import axios from "axios";
import {
  ADD_EXPENSE_FAIL,
  ADD_EXPENSE_REQUEST,
  ADD_EXPENSE_SUCCESS,
  DELETE_EXPENSE_FAIL,
  DELETE_EXPENSE_REQUEST,
  DELETE_EXPENSE_SUCCESS,
  GET_EXPENSES_BY_MONTH_AND_YEAR_FAIL,
  GET_EXPENSES_BY_MONTH_AND_YEAR_REQUEST,
  GET_EXPENSES_BY_MONTH_AND_YEAR_SUCCESS,
  GET_EXPENSES_FAIL,
  GET_EXPENSES_REQUEST,
  GET_EXPENSES_SUCCESS,
  GET_EXPENSE_FAIL,
  GET_EXPENSE_REQUEST,
  GET_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_FAIL,
  UPDATE_EXPENSE_REQUEST,
  UPDATE_EXPENSE_SUCCESS,
} from "../constants/expensesConstants";

export const addExpense =
  ({ amount, date, description, account }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_EXPENSE_REQUEST });
      const { data } = await axios.post("http://localhost:5000/expenses", {
        amount,
        date,
        description,
        account,
      });
      dispatch({ type: ADD_EXPENSE_SUCCESS, payload: data });
      // const result = await axios.get(`http://localhost:5000/expenses`);
      // dispatch({ type: GET_EXPENSES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_EXPENSE_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateExpense =
  (id, { amount, date, description, account }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_EXPENSE_REQUEST });
      const { data } = await axios.put(`http://localhost:5000/expenses/${id}`, {
        amount,
        date,
        description,
        account,
      });
      dispatch({ type: UPDATE_EXPENSE_SUCCESS, payload: data });
      // const result = await axios.get(`http://localhost:5000/expenses`);
      // dispatch({ type: GET_EXPENSES_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_EXPENSE_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getExpense = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_EXPENSE_REQUEST });
    const { data } = await axios.get(`http://localhost:5000/expenses/${id}`);
    dispatch({ type: GET_EXPENSE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EXPENSE_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteExpense = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EXPENSE_REQUEST });
    const { data } = await axios.delete(`http://localhost:5000/expenses/${id}`);
    dispatch({ type: DELETE_EXPENSE_SUCCESS, payload: data });
    // const result = await axios.get(`http://localhost:5000/expenses`);
    // dispatch({ type: GET_EXPENSES_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_EXPENSE_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getExpenses = () => async (dispatch) => {
  try {
    dispatch({ type: GET_EXPENSES_REQUEST });
    const result = await axios.get(`http://localhost:5000/expenses`);
    dispatch({ type: GET_EXPENSES_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_EXPENSES_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getExpensesByMonthAndYear = (month, year) => async (dispatch) => {
  try {
    dispatch({ type: GET_EXPENSES_BY_MONTH_AND_YEAR_REQUEST });
    const { data } = await axios.get(
      `http://localhost:5000/expenses/${month}/${year}`
    );
    dispatch({ type: GET_EXPENSES_BY_MONTH_AND_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EXPENSES_BY_MONTH_AND_YEAR_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
