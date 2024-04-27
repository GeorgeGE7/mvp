import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import swal from "sweetalert";

import AdminSidebar from "./AdminSidebar";

import { Link } from "react-router-dom";
import { postActions } from "../../redux/slices/postSlice";
import { getAllPosts, deletePost } from "../../redux/apiCalls/postsApiCall";
import "./tables.css";

const PostsTable = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(postActions.hideSearchBar());
    dispatch(getAllPosts());
  }, [posts]);
  const deleteTableItemHandler = (postId) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deletePost(postId));
        swal("Post has been deleted!", {
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
        <h1 id="table-title">Products table</h1>
        <table>
          <thead>
            <tr>
              <th>Count</th>
              {/* <th>User</th> */}
              <th>Product title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                {/* <td>
                  <div id="username-and-image">
                    <img src={item?.user?.profilePhoto?.url} alt="user" />
                    <span>{item.user.username}</span>
                  </div>
                </td> */}
                <td>
                  <div id="username-and-image">
                    <img src={item?.image?.url} alt="user" />
                    {item?.title}
                  </div>
                </td>
                <td>
                  <div id="table-btns-group">
                    <button className="btn">
                      <Link to={`/posts/orders/${item._id}`}>Orders</Link>
                    </button>
                    <button className="btn" id="extra">
                      <Link to={`/posts/details/${item._id}`}>
                        View
                      </Link>
                    </button>
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

export default PostsTable;
