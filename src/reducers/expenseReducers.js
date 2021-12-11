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

export const expenseReducer = (state = { expense: {} }, action) => {
  switch (action.type) {
    case ADD_EXPENSE_REQUEST:
      return { loading: true };
    case ADD_EXPENSE_SUCCESS:
      return { loading: false, expense: action.payload };
    case ADD_EXPENSE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_EXPENSE_REQUEST:
      return { loading: true };
    case UPDATE_EXPENSE_SUCCESS:
      return { loading: false, expense: action.payload };
    case UPDATE_EXPENSE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_EXPENSE_REQUEST:
      return { loading: true };
    case DELETE_EXPENSE_SUCCESS:
      return { loading: false, expense: action.payload };
    case DELETE_EXPENSE_FAIL:
      return { loading: false, error: action.payload };
    case GET_EXPENSE_REQUEST:
      return { loading: true };
    case GET_EXPENSE_SUCCESS:
      return { loading: false, expense: action.payload };
    case GET_EXPENSE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const expensesReducer = (state = { expenses: [] }, action) => {
  switch (action.type) {
    case GET_EXPENSES_REQUEST:
      return { loading: true };
    case GET_EXPENSES_SUCCESS:
      return { loading: false, expenses: action.payload };
    case GET_EXPENSES_FAIL:
      return { loading: true, error: action.payload };
    case GET_EXPENSES_BY_MONTH_AND_YEAR_REQUEST:
      return { loading: true };
    case GET_EXPENSES_BY_MONTH_AND_YEAR_SUCCESS:
      return { loading: false, expenses: action.payload };
    case GET_EXPENSES_BY_MONTH_AND_YEAR_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
};
