import React from "react"
import { Link } from "react-router-dom";

const Order = ({ item, index, deleteTableItemHandler }) => {

  return (
    <tr>
      <td>{index + 1}</td>
      <td>
        <div id="username-and-image">
          <span>{item?.postId?.title}</span>
        </div>
      </td>
      <td>{`${item?.user?.country}, ${item?.user?.state}, ${item?.user?.city}`}</td>
      <td>
        <div id="table-btns-group">
          <button className="btn">
            <Link to={`/posts/details/${item._id}`}>Contact</Link>
          </button>
          <button onClick={deleteTableItemHandler} className="btn btn-alt">
            Status
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Order;
