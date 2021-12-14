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

export const incomeReducer = (state = { income: {} }, action) => {
  switch (action.type) {
    case ADD_INCOME_REQUEST:
      return { loading: true };
    case ADD_INCOME_SUCCESS:
      return { loading: false, income: action.payload };
    case ADD_INCOME_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_INCOME_REQUEST:
      return { loading: true };
    case UPDATE_INCOME_SUCCESS:
      return { loading: false, income: action.payload };
    case UPDATE_INCOME_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_INCOME_REQUEST:
      return { loading: true };
    case DELETE_INCOME_SUCCESS:
      return { loading: false, income: action.payload };
    case DELETE_INCOME_FAIL:
      return { loading: false, error: action.payload };
    case GET_INCOME_REQUEST:
      return { loading: true };
    case GET_INCOME_SUCCESS:
      return { loading: false, income: action.payload };
    case GET_INCOME_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const incomesReducer = (state = { incomes: [] }, action) => {
  switch (action.type) {
    case GET_INCOMES_REQUEST:
      return { loading: true };
    case GET_INCOMES_SUCCESS:
      return { loading: false, incomes: action.payload };
    case GET_INCOMES_FAIL:
      return { loading: true, error: action.payload };
    case GET_INCOMES_BY_MONTH_AND_YEAR_REQUEST:
      return { loading: true };
    case GET_INCOMES_BY_MONTH_AND_YEAR_SUCCESS:
      return { loading: false, incomes: action.payload };
    case GET_INCOMES_BY_MONTH_AND_YEAR_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};
