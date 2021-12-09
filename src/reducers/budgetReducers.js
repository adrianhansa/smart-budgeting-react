import {
  ADD_BUDGET_LIMIT_FAIL,
  ADD_BUDGET_LIMIT_REQUEST,
  ADD_BUDGET_LIMIT_SUCCESS,
  DELETE_BUDGET_LIMIT_FAIL,
  DELETE_BUDGET_LIMIT_REQUEST,
  DELETE_BUDGET_LIMIT_SUCCESS,
  GET_BUDGET_LIMITS_FAIL,
  GET_BUDGET_LIMITS_REQUEST,
  GET_BUDGET_LIMITS_SUCCESS,
  GET_BUDGET_LIMIT_FAIL,
  GET_BUDGET_LIMIT_REQUEST,
  GET_BUDGET_LIMIT_SUCCESS,
  UPDATE_BUDGET_LIMIT_FAIL,
  UPDATE_BUDGET_LIMIT_REQUEST,
  UPDATE_BUDGET_LIMIT_SUCCESS,
} from "../constants/budgetConstants";

export const budgetLimitsReducer = (state = { budgetLimits: [] }, action) => {
  switch (action.type) {
    case GET_BUDGET_LIMITS_REQUEST:
      return { loading: true };
    case GET_BUDGET_LIMITS_SUCCESS:
      return { loading: false, budgetLimits: action.payload };
    case GET_BUDGET_LIMITS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const budgetLimitReducer = (state = { budgetLimit: {} }, action) => {
  switch (action.type) {
    case GET_BUDGET_LIMIT_REQUEST:
      return { loading: true };
    case GET_BUDGET_LIMIT_SUCCESS:
      return { loading: false, budgetLimit: action.payload };
    case GET_BUDGET_LIMIT_FAIL:
      return { loading: false, error: action.payload };
    case ADD_BUDGET_LIMIT_REQUEST:
      return { loading: true };
    case ADD_BUDGET_LIMIT_SUCCESS:
      return { loading: false, budgetLimit: action.payload };
    case ADD_BUDGET_LIMIT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_BUDGET_LIMIT_REQUEST:
      return { loading: true };
    case UPDATE_BUDGET_LIMIT_SUCCESS:
      return { loading: false, budgetLimit: action.payload };
    case UPDATE_BUDGET_LIMIT_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_BUDGET_LIMIT_REQUEST:
      return { loading: true };
    case DELETE_BUDGET_LIMIT_SUCCESS:
      return { loading: false, budgetLimit: action.payload };
    case DELETE_BUDGET_LIMIT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
