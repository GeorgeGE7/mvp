import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import swal from "sweetalert";

import { postActions } from "../../redux/slices/postSlice";
import {
  deleteUserProfile,
  getUsersProfile,
} from "../../redux/apiCalls/userProfileApiCall";

import AdminSidebar from "./AdminSidebar";

import "./tables.css";

const UsersTable = () => {
  const dispatch = useDispatch();
  const { usersProfile, isProfileDeleted } = useSelector(
    (state) => state.userProfile
  );

  useEffect(() => {
    dispatch(postActions.hideSearchBar());
    dispatch(getUsersProfile());
  }, [isProfileDeleted]);

  const deleteTableItemHandler = (userId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteUserProfile(userId));
        // swal("User has been deleted!", {
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
        <h1 id="table-title">Users table</h1>
        <table>
          <thead>
            <tr>
              <th>Count</th>
              <th>User</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {usersProfile?.map((item, index) => (
              <tr key={item?._id}>
                <td>{index + 1}</td>
                <td>
                  <div id="username-and-image">
                    <img src={item?.profilePhoto?.url} alt="user" />
                    <span>{item?.username}</span>
                  </div>
                </td>
                <td>{item?.email}</td>
                <td>
                  <div id="table-btns-group">
                    <button className="btn">
                      <Link to={`/profile/${item?._id}`}>View</Link>
                    </button>
                    {!item?.isAdmin && <button
                      onClick={() => deleteTableItemHandler(item?._id)}
                      className="btn btn-alt"
                    >
                      Delete
                    </button>}
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

export default UsersTable;
