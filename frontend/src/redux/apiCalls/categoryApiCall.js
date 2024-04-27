import { toast } from "react-toastify";
import { categoryActions } from "../slices/categorySlice";
import BASE_URL from "../../utils/request";

export function getAllCategories() {
  return async (dispatch) => {
    try {
      const response = await BASE_URL.get("/api/categories");
      dispatch(categoryActions.setCategories(response.data));
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(`error in getAllCategories: ${error}`);
    }
  };
}
export function createCategory(newCategory) {
  return async (dispatch, getState) => {
    try {
      const response = await BASE_URL.post("/api/categories", newCategory, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.addNewCategory(response.data));
      toast.success("Category created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(`error in createCategory: ${error}`);
    }
  };
}

export function deleteCategory(id) {
  return async (dispatch, getState) => {
    try {
      const response = await BASE_URL.delete(`/api/categories/${id}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(categoryActions.deleteACategory(response.categoryId));
      toast.success(response.data?.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(`error in deleteCategory: ${error}`);
    }
  };
}
