import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PostList from "../../components/posts/PostList";
import "./cart.css";
import { postActions } from "../../redux/slices/postSlice";

const CartPage = () => {
  const dispatch = useDispatch();
  const { userCart } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(postActions.hideSearchBar());
  }, []);

  return (
    <main id="cart">
      <section className="category">
        {userCart?.length === 0 ? (
          <>
            <h2 id="category-not-found">
              There is no product on your cart yet!
            </h2>
            <Link className="btn category-not-found-link" to="/">
              Back to home
            </Link>
          </>
        ) : (
          <PostList title={"Your Cart"} posts={userCart} />
        )}
      </section>
    </main>
  );
};

export default CartPage;
