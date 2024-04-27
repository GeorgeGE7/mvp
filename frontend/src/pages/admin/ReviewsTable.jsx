import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import swal from "sweetalert";

import AdminSidebar from "./AdminSidebar";
import { postActions } from "../../redux/slices/postSlice";
import { deleteReview, getAllReviews } from "../../redux/apiCalls/reviewApiCall";
import { deleteUserProfile } from "../../redux/apiCalls/userProfileApiCall";

const ReviewsTable = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(postActions.hideSearchBar());
    dispatch(getAllReviews());
  }, [reviews]);
  const deleteTableItemHandler = (reviewId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteReview(reviewId));
        swal("Review has been deleted!", {
          icon: "success",
        });
      } else {
        swal("No changes happened");
      }
    });
  };

  return (
    <main id="admin-main-table">
      <AdminSidebar />
      <div id="table-container">
        <h1 id="table-title">Reviews table</h1>
        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Review</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews?.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div id="username-and-image">
                    <img src={item?.user?.profilePhoto?.url} alt="user" />
                    <span>{item?.user?.username}</span>
                  </div>
                </td>
                <td>{item?.text}</td>
                <td>
                  <div id="table-btns-group">
                    <button
                      onClick={() => deleteTableItemHandler(item?._id)}
                      className="btn btn-alt"
                    >
                      Delete
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

export default ReviewsTable;
