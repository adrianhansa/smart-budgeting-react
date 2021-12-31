import axios from "axios";
import {
  ADD_INCOME_FAIL,
  ADD_INCOME_REQUEST,
  ADD_INCOME_SUCCESS,
  DELETE_INCOME_FAIL,
  DELETE_INCOME_REQUEST,
  DELETE_INCOME_SUCCESS,
  GET_INCOMES_BY_MONTH_AND_YEAR_FAIL,
  GET_INCOMES_BY_MONTH_AND_YEAR_REQUEST,
  GET_INCOMES_BY_MONTH_AND_YEAR_SUCCESS,
  GET_INCOMES_FAIL,
  GET_INCOMES_REQUEST,
  GET_INCOMES_SUCCESS,
  GET_INCOME_FAIL,
  GET_INCOME_REQUEST,
  GET_INCOME_SUCCESS,
  UPDATE_INCOME_FAIL,
  UPDATE_INCOME_REQUEST,
  UPDATE_INCOME_SUCCESS,
} from "../constants/incomeConstants";
import { URL } from "../constants/url";

export const addIncome =
  ({ amount, date, description }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_INCOME_REQUEST });
      const { data } = await axios.post(`${URL}/income`, {
        amount,
        date,
        description,
      });
      dispatch({ type: ADD_INCOME_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ADD_INCOME_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateIncome =
  (id, { amount, date, description }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_INCOME_REQUEST });
      const { data } = await axios.put(`${URL}/income/${id}`, {
        amount,
        date,
        description,
      });
      dispatch({ type: UPDATE_INCOME_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: UPDATE_INCOME_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getIncome = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_INCOME_REQUEST });
    const { data } = await axios.get(`${URL}/income/${id}`);
    dispatch({ type: GET_INCOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_INCOME_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteIncome = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_INCOME_REQUEST });
    const { data } = await axios.delete(`${URL}/income/${id}`);
    dispatch({ type: DELETE_INCOME_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: DELETE_INCOME_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getIncomes = () => async (dispatch) => {
  try {
    dispatch({ type: GET_INCOMES_REQUEST });
    const result = await axios.get(`${URL}/income`);
    dispatch({ type: GET_INCOMES_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: GET_INCOMES_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getIncomesByMonthAndYear = (month, year) => async (dispatch) => {
  try {
    dispatch({ type: GET_INCOMES_BY_MONTH_AND_YEAR_REQUEST });
    const { data } = await axios.get(`${URL}/income/${month}/${year}`);
    dispatch({ type: GET_INCOMES_BY_MONTH_AND_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_INCOMES_BY_MONTH_AND_YEAR_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
