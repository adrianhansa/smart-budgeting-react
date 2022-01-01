import axios from "axios";
import {
  ADD_USER_FAIL,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USERS_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  TOGGLE_USER_ADMIN_FAIL,
  TOGGLE_USER_ADMIN_REQUEST,
  TOGGLE_USER_ADMIN_SUCCESS,
} from "../constants/userConstants";
import { URL } from "../constants/url";

export const register =
  ({ email, password, household, name, passwordVerify }) =>
  async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });
      const { data } = await axios.post(`${URL}/register`, {
        email,
        password,
        passwordVerify,
        name,
        household,
      });
      dispatch({ type: REGISTER_SUCCESS, payload: data });
      localStorage.setItem("auth", JSON.stringify({ user: data }));
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      const { data } = await axios.post(`${URL}/login`, {
        email,
        password,
      });
      dispatch({ type: LOGIN_SUCCESS, payload: data });
      localStorage.setItem("auth", JSON.stringify({ user: data }));
    } catch (error) {
      dispatch({
        type: LOGIN_FAIL,
        payload:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
  await axios.get(`${URL}/logout`);
  localStorage.removeItem("auth");
};

export const addUser =
  ({ name, email, password, passwordVerify }) =>
  async (dispatch) => {
    try {
      dispatch({ type: ADD_USER_REQUEST });
      const { data } = await axios.post(`${URL}/add-user`, {
        name,
        email,
        password,
        passwordVerify,
      });
      dispatch({ type: ADD_USER_SUCCESS, payload: data });
      const result = await axios.get(`${URL}/users`);
      dispatch({ type: GET_USERS_SUCCESS, payload: result.data.users });
    } catch (error) {
      dispatch({
        type: ADD_USER_FAIL,
        error:
          error.response.data.message && error.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });
    const { data } = await axios.delete(
      `http://localhost:5000/delete-user/${id}`
    );
    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
    const result = await axios.get(`${URL}/users`);
    dispatch({ type: GET_USERS_SUCCESS, payload: result.data.users });
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      error:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USERS_REQUEST });
    const { data } = await axios.get(`${URL}/users`);
    dispatch({ type: GET_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: GET_USERS_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const toggleAdmin = (id, isAdmin) => async (dispatch) => {
  try {
    dispatch({ type: TOGGLE_USER_ADMIN_REQUEST });
    const { data } = await axios.put(`${URL}/toggle-admin/${id}`, { isAdmin });
    dispatch({ type: TOGGLE_USER_ADMIN_SUCCESS, payload: data });
    const response = await axios.get(`${URL}/users`);
    dispatch({ type: GET_USERS_SUCCESS, payload: response.data.users });
  } catch (error) {
    dispatch({
      type: TOGGLE_USER_ADMIN_FAIL,
      payload:
        error.response.data.message && error.message
          ? error.response.data.message
          : error.message,
    });
  }
};
