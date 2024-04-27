import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createCategory } from "../../redux/apiCalls/categoryApiCall";

const AddCategoryForm = () => {
  const dispatch = useDispatch();
  const [categoryTitle, setCategoryTitle] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (categoryTitle.trim() == "") {
      return toast.error("Category title is required");
    }
    dispatch(createCategory({title: categoryTitle}));
    setCategoryTitle("");

    console.log({ categoryTitle });
  };
  return (
    <div id="add-category">
      <h5 id="add-category-title">Add new category</h5>
      <form id="add-category-form" onSubmit={formSubmitHandler}>
        <div>
          <label htmlFor="title">Category title</label>
          <input
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            type="text"
            id="title"
          />
        </div>
        <button className="btn" id="add-category-btn" type="submit">
          Add category
        </button>
      </form>
    </div>
  );
};

export default AddCategoryForm;
