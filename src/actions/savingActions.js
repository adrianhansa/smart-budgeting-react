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
  GET_SAVING_BY_MONYTH_AND_YEAR_FAIL,
  GET_SAVING_BY_MONYTH_AND_YEAR_REQUEST,
  GET_SAVING_BY_MONYTH_AND_YEAR_SUCCESS,
  UPDATE_SAVING_FAIL,
  UPDATE_SAVING_REQUEST,
  UPDATE_SAVING_SUCCESS,
} from "../constants/savingContans";

export const addSaving =
  ({ amount, month, year }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_SAVING_REQUEST });
      const { data } = await axios.post("http://localhost:5000/savings", {
        amount,
        month,
        year,
      });
      dispatch({ type: ADD_SAVING_SUCCESS, payload: data });
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

export const getSaving = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SAVING_BY_MONYTH_AND_YEAR_REQUEST });
    const { data } = axios.get(`http://localhost:5000/savings/${id}`);
    dispatch({ type: GET_SAVING_BY_MONYTH_AND_YEAR_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_SAVING_BY_MONYTH_AND_YEAR_FAIL,
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
    const { data } = axios.delete(`http://localhost:5000/savings/${id}`);
    dispatch({ type: DELETE_SAVING_SUCCESS, payload: data });
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
      const { data } = axios.put(`http://localhost:5000/savings/${id}`, {
        amount,
      });
      dispatch({ type: UPDATE_SAVING_SUCCESS, payload: data });
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
    const result = axios.get(`http://localhost:5000/savings/${id}`);
    dispatch({ type: GET_SAVINGS_SUCCESS, payload: result.data });
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
