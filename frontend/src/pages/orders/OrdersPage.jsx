import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import PostList from "../../components/posts/PostList";
// import "./cart.css";
import { postActions } from "../../redux/slices/postSlice";
import { getAllUserOrders } from "../../redux/apiCalls/ordersApiCall";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { userCart } = useSelector((state) => state.cart);
  const { orders } = useSelector((state) => state.order);
  const { id } = useParams()

  useEffect(() => {
    dispatch(postActions.hideSearchBar());
    dispatch(getAllUserOrders(id))
  },[]);

  return (
    <main id="cart">
      <section className="category">
        {orders?.length === 0 ? (
          <>
            <h2 id="category-not-found">
              There is no Orders yet!
            </h2>
            <Link className="btn category-not-found-link" to="/">
              Back to home
            </Link>
          </>
        ) : (
          <PostList title={"Your Orders"} posts={orders} />
        )}
      </section>
    </main>
  );
};

export default OrdersPage;
