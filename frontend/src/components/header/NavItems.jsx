import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logoutUser } from "../../redux/apiCalls/authApiCall";

const NavItems = ({ setToggle }) => {
  const [userDropdown, setUserDropdown] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { userCart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    setUserDropdown(false);
    dispatch(logoutUser());
  };
  return (
    <nav>
      <ul className="nav-items">
        <li onClick={() => setToggle(false)}>
          <Link to="/">Shop</Link>
        </li>

        <li onClick={() => setToggle(false)}>
          <Link to="/user/cart">
            <span id="cart-length">{userCart?.length}</span>Cart
          </Link>
        </li>

        {user && (
          <>
            <li onClick={() => setToggle(false)}>
              <Link to={`/orders/${user?._id}`}>Orders</Link>
            </li>

            <li onClick={() => setToggle(false)}>
              <Link to="/posts/create-product">Create</Link>
            </li>
          </>
        )}

        {user?.isAdmin && (
          <li onClick={() => setToggle(false)}>
            <Link to="/admin-dashboard">Admin Dashboard</Link>
          </li>
        )}
        {user ? (
          <>
            <div id="header-user-data">
              <img
                onClick={() => setUserDropdown((prev) => !prev)}
                id="header-user-image"
                src={user?.profilePhoto?.url}
                alt="User"
              />
              <span
                onClick={() => setUserDropdown((prev) => !prev)}
                id="header-username"
              >
                {user?.username}
              </span>
              {userDropdown && (
                <div id="header-user-dropdown">
                  <Link
                    onClick={() => setUserDropdown((prev) => !prev)}
                    to={`/profile/${user?._id}`}
                  >
                    Profile
                  </Link>
                  <Link onClick={logoutHandler}>Logout</Link>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <li onClick={() => setToggle(false)}>
              <Link to="/signup">Signup</Link>
            </li>
            <li onClick={() => setToggle(false)}>
              <Link to="/login">Login</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavItems;
