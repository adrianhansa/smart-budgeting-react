import axios from "axios";
import {
  ADD_SAVING_FAIL,
  ADD_SAVING_REQUEST,
  ADD_SAVING_SUCCESS,
  DELETE_SAVING_FAIL,
  DELETE_SAVING_REQUEST,
  DELETE_SAVING_SUCCESS,
  GET_SAVINGS_FAIL,
  GET_SAVINGS_REQUEST,
  GET_SAVINGS_SUCCESS,
  GET_SAVING_BY_MONTH_AND_YEAR_FAIL,
  GET_SAVING_BY_MONTH_AND_YEAR_REQUEST,
  GET_SAVING_BY_MONTH_AND_YEAR_SUCCESS,
  UPDATE_SAVING_FAIL,
  UPDATE_SAVING_REQUEST,
  UPDATE_SAVING_SUCCESS,
} from "../constants/savingConstans";
import { URL } from "../constants/url";

export const addSaving =
  ({ amount, month, year }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_SAVING_REQUEST });
      const { data } = await axios.post(`${URL}/savings`, {
        amount,
        month,
        year,
      });
      dispatch({ type: ADD_SAVING_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/savings`);
      dispatch({ type: GET_SAVINGS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: ADD_SAVING_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSaving =
  ({ month, year }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_SAVING_BY_MONTH_AND_YEAR_REQUEST });
      const { data } = await axios.get(`${URL}/savings/${year}/${month}`);
      dispatch({ type: GET_SAVING_BY_MONTH_AND_YEAR_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: GET_SAVING_BY_MONTH_AND_YEAR_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteSaving = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SAVING_REQUEST });
    const { data } = await axios.delete(`${URL}/savings/${id}`);
    dispatch({ type: DELETE_SAVING_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/savings`);
    dispatch({ type: GET_SAVINGS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_SAVING_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateSaving =
  (id, { amount }) =>
  async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SAVING_REQUEST });
      const { data } = await axios.put(`${URL}/savings/${id}`, {
        amount,
      });
      dispatch({ type: UPDATE_SAVING_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/savings`);
      dispatch({ type: GET_SAVINGS_SUCCESS, payload: result.data });
    } catch (error) {
      dispatch({
        type: UPDATE_SAVING_FAIL,
        payload:
          error.message && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSavings = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SAVINGS_REQUEST });
    const { data } = await axios.get(`${URL}/savings`);
    dispatch({ type: GET_SAVINGS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SAVINGS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
