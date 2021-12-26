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

export const getSavingReducer = (state = { saving: {} }, action) => {
  switch (action.type) {
    case GET_SAVING_BY_MONTH_AND_YEAR_REQUEST:
      return { loading: true };
    case GET_SAVING_BY_MONTH_AND_YEAR_SUCCESS:
      return { loading: false, saving: action.payload };
    case GET_SAVING_BY_MONTH_AND_YEAR_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_SAVING_REQUEST:
      return { loading: true };
    case DELETE_SAVING_SUCCESS:
      return { loading: false, saving: action.payload };
    case DELETE_SAVING_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_SAVING_REQUEST:
      return { loading: true };
    case UPDATE_SAVING_SUCCESS:
      return { loading: false, saving: action.payload };
    case UPDATE_SAVING_FAIL:
      return { loading: false, error: action.payload };
    case ADD_SAVING_REQUEST:
      return { loading: true };
    case ADD_SAVING_SUCCESS:
      return { loading: false, saving: action.payload };
    case ADD_SAVING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getSavingsReducer = (state = { savings: [] }, action) => {
  switch (action.type) {
    case GET_SAVINGS_REQUEST:
      return { loading: true };
    case GET_SAVINGS_SUCCESS:
      return { loading: false, savings: action.payload };
    case GET_SAVINGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
