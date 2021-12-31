import axios from "axios";
import {
  ARCHIVE_EVENT_FAIL,
  ARCHIVE_EVENT_REQUEST,
  ARCHIVE_EVENT_SUCCESS,
  DELETE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  GET_EVENTS_FAIL,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
} from "../constants/eventConstants";
import { URL } from "../constants/url";

export const getEvents = () => async (dispatch) => {
  try {
    dispatch({ type: GET_EVENTS_REQUEST });
    const { data } = await axios.get(`${URL}/events`);
    dispatch({ type: GET_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EVENTS_FAIL,
      payload:
        error.message && error.response.data.message
          ? error.message
          : error.response.data.message,
    });
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });
    const { data } = await axios.delete(`${URL}/events/${id}`);
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/events`);
    dispatch({ type: GET_EVENTS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const archiveEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: ARCHIVE_EVENT_REQUEST });
    const { data } = await axios.delete(`${URL}/events/${id}`);
    dispatch({ type: ARCHIVE_EVENT_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/events`);
    dispatch({ type: GET_EVENTS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: ARCHIVE_EVENT_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
