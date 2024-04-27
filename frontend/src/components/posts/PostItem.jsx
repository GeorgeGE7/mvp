import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userCartActions } from "../../redux/slices/cartSlice";
import { createNewOrder } from "../../redux/apiCalls/ordersApiCall";
import { RotatingLines } from "react-loader-spinner";

const PostItem = ({ title, post }) => {
  const dispatch = useDispatch();
  const { userCart } = useSelector((state) => state.cart);
  const [existInCart, setExistInCart] = useState(false);
  const [loginOrSignUpView, setLoginOrSignUpView] = useState(false);

  const { loading, isOrderCreated } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const existingItem = userCart.find(
      (i) => i._id === (title === "Your Orders" ? post?.postId?._id : post?._id)
    );
    if (existingItem) {
      setExistInCart(true);
    } else {
      setExistInCart(false);
    }
  }, [userCart, title === "Your Orders" ? post?.postId : post]);

  const handleAddToCart = () => {
    dispatch(
      userCartActions.handleCartAddOrRemove(
        title === "Your Orders" ? post?.postId : post
      )
    );
    // console.log(userCart);
  };

  const createOrder = () => {
    if (user) {
      dispatch(
        createNewOrder({
          postId: title === "Your Orders" ? post?.postId?._id : post?._id,
        })
      );
    } else {
      setLoginOrSignUpView(true);
    }
  };
  return (
    <>
      {loginOrSignUpView && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "90%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "var(--color-gray-600)",
              flexDirection: "column",
              padding: "2rem 0 2rem 0 ",
              fontWeight: "600",
            }}
          >
            <h2>You must login first</h2>
            <Link
              className="btn"
              style={{ margin: "2rem 0 1rem 0" }}
              to={"/signup"}
            >
              Create new account
            </Link>
            OR
            <Link style={{ marginTop: "1rem" }} className="btn" to={"/login"}>
              Login
            </Link>
          </div>
        </div>
      )}
      <article className="product-item">
        <img
          src={
            title === "Your Orders"
              ? post?.postId?.image?.url
              : post?.image?.url
          }
          alt={title === "Your Orders" ? post?.postId?.title : post?.title}
        />
        <div className="product-item-content">
          <h2 style={{marginBottom: "0.25rem"}}>
            {title === "Your Orders" ? post?.postId?.title : post?.title}
          </h2>
          <Link
            to={`/posts/categories/${
              title === "Your Orders" ? post?.postId?.category : post?.category
            }`}
          >
            {post?.category}
          </Link>

          <p id="post-summery" style={{height:"2.4rem", marginTop: "0.25rem"}}>
            {title === "Your Orders" ? post?.postId?.content : post?.content}
          </p>

          <div className="product-item-actions">
            <Link
              className="btn btn-alt"
              to={`/posts/details/${
                title === "Your Orders" ? post?.postId?._id : post?._id
              }`}
            >
              View Details
            </Link>
            {title === "Your Orders" ? (
              <button className="btn" id="status">
                {post?.status}
              </button>
            ) : (
              <Link onClick={handleAddToCart} className="btn btn-alt">
                {!existInCart ? "Add to cart" : "In the cart"}
              </Link>
            )}
          </div>
          {title === "Your Cart" &&
            (loading ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontWeight: "bold",
                  backgroundColor: "gray",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
                className="btn"
              >
                <span style={{ marginRight: "0.5rem" }}>Loading...</span>
                <RotatingLines
                  strokeColor="white"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="20"
                  visible={true}
                />
              </div>
            ) : (
              <button
                onClick={createOrder}
                className="btn"
                style={{ width: "100%", marginTop: "0.57rem" }}
              >
                Buy now
              </button>
            ))}
        </div>
      </article>
    </>
  );
};

export default PostItem;
