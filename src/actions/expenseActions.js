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
