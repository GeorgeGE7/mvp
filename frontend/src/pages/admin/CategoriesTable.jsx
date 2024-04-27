import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";

import AdminSidebar from "./AdminSidebar";
import { postActions } from "../../redux/slices/postSlice";
import { deleteCategory, getAllCategories } from "../../redux/apiCalls/categoryApiCall";
import { Link } from "react-router-dom";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(postActions.hideSearchBar());
    dispatch(getAllCategories());
  }, [categories]);
  const deleteTableItemHandler = (cateId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteCategory(cateId))
        // swal("Category has been deleted!", {
        //   icon: "success",
        // });
      } else {
        swal("No changes happened");
      }
    });
  };

  return (
    <main id="admin-main-table">
      <AdminSidebar />
      <div id="table-container">
        <h1 id="table-title">Categories table</h1>
        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>Category title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <Link
                    to={`/posts/categories/${item?.title}`}
                    style={{ color: "unset" }}
                  >
                    <b>{item?.title}</b>
                  </Link>
                </td>
                <td>
                  <div id="table-btns-group">
                    <button
                      onClick={() => deleteTableItemHandler(item?._id)}
                      className="btn btn-alt"
                    >
                      Delete Category
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default CategoriesTable;
