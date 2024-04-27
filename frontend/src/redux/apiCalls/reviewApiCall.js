import { toast } from "react-toastify";
import { postActions } from "../slices/postSlice";
import { reviewActions } from "../slices/reviewSlice";
import BASE_URL from "../../utils/request";

export function createReview(review) {
  return async (dispatch, getState) => {
    try {
      const response = await BASE_URL.post("/api/comments", review, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(postActions.addPostReview(response.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(`error in createReview: ${error}`);
    }
  };
}

export function updateReview(reviewId, updatedReview) {
  return async (dispatch, getState) => {
    try {
      const response = await BASE_URL.put(
        `/api/comments/${reviewId}`,
        updatedReview,
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(postActions.updatePosteReview(response.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(`error in updateReview: ${error}`);
    }
  };
}

export function deleteReview(reviewId) {
  return async (dispatch, getState) => {
    try {
      await BASE_URL.delete(`/api/comments/${reviewId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(reviewActions.deleteReview(reviewId));
      dispatch(postActions.deletePosteReview(reviewId));
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(`error in deleteReview: ${error}`);
    }
  };
}

export function getAllReviews() {
  return async (dispatch, getState) => {
    try {
      const response = await BASE_URL.get(`/api/comments/`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(reviewActions.setReviews(response.data));
    } catch (error) {
      toast.error(error.response?.data.message);
      console.log(`error in deleteReview: ${error}`);
    }
  };
}
