import axios from "axios";
import {
  DELETE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  GET_EVENTS_FAIL,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
} from "../constants/eventConstants";

export const getEvents = () => async (dispatch) => {
  try {
    dispatch({ type: GET_EVENTS_REQUEST });
    const { data } = await axios.get("http://localhost:5000/events");
    dispatch({ type: GET_EVENTS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_EVENTS_FAIL,
      payload:
        error.message && error.request.data.message
          ? error.message
          : error.request.data.message,
    });
  }
};

export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EVENT_REQUEST });
    const { data } = await axios.delete(`http://localhost:5000/events/${id}`);
    dispatch({ type: DELETE_EVENT_SUCCESS, payload: data });
    const result = await axios.get("http://localhost:5000/events");
    dispatch({ type: GET_EVENTS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({
      type: DELETE_EVENT_FAIL,
      payload:
        error.resposne.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
