import {
  DELETE_EVENT_FAIL,
  DELETE_EVENT_REQUEST,
  DELETE_EVENT_SUCCESS,
  GET_EVENTS_FAIL,
  GET_EVENTS_REQUEST,
  GET_EVENTS_SUCCESS,
} from "../constants/eventConstants";

export const eventsReducer = (state = { events: [] }, action) => {
  switch (action.type) {
    case GET_EVENTS_REQUEST:
      return { loading: true };
    case GET_EVENTS_SUCCESS:
      return { loading: false, events: action.payload };
    case GET_EVENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const eventReducer = (state = { event: {} }, action) => {
  switch (action.type) {
    case DELETE_EVENT_REQUEST:
      return { loading: true };
    case DELETE_EVENT_SUCCESS:
      return { loading: false, event: action.payload };
    case DELETE_EVENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
