import constants from "@/constants";
import { authService } from "./services";

export default {
  autoAuth: () => async dispatch => {
    const response = await authService.autoAuth();
    const { data } = response;
    dispatch({
      type: constants.AUTO_LOGIN,
      payload: data
    });
  },

  registerUser: credentials => async dispatch => {
    try {
      const response = await authService.registerUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.LOGIN_USER,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.AUTH_ERROR,
        payload: data.meta.message
      });
    }
  },

  loginUser: credentials => async dispatch => {
    try {
      const response = await authService.loginUser(credentials);
      const { data } = response;
      dispatch({
        type: constants.LOGIN_USER,
        payload: data
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.AUTH_ERROR,
        payload: data.meta.message
      });
    }
  },

  logoutUser: () => async dispatch => {
    try {
      await authService.logoutUser();
      dispatch({
        type: constants.LOGOUT_USER
      });
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: constants.AUTH_ERROR,
        payload: data.meta.message
      });
    }
  }
};
