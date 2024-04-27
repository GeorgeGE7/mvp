import { toast } from "react-toastify";
import { passwordActions } from "../slices/passwordSlice";
import BASE_URL from "../../utils/request";

export function requestResetForgotPassword(userEmail) {
  return async () => {
    try {
      const response = await BASE_URL.post("/api/password/reset-password", {
        email: userEmail,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(`error in requestResetForgotPassword: ${error}`);
    }
  };
}

export function setNewPasswordForForgotPassword(newPassword, user) {
  return async () => {
    try {
      const response = await BASE_URL.post(
        `/api/password/reset-password/${user.userId}/${user.token}`,
        { password: newPassword }
      );
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(`error in setNewPasswordForForgotPassword: ${error}`);
    }
  };
}

export function getResetPasswordLink(userId, token) {
  return async (dispatch) => {
    try {
      await BASE_URL.get(`/api/password/reset-password/${userId}/${token}`);
    } catch (error) {
      toast.error(error.response?.data?.message);
      dispatch(passwordActions.setError());
      console.log(`error in getResetPassword: ${error}`);
    }
  };
}
