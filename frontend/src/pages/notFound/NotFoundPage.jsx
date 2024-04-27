import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { postActions } from "../../redux/slices/postSlice";
import "./notFound.css";

const NotFoundPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.hideSearchBar());
  }, []);

  return (
    <main>
      <div id="not-found">
        <p>404</p>
        <div id="not-found-title">Page not found</div>
        <button className="btn">
          <Link to="/">Back to safety</Link>
        </button>
      </div>
    </main>
  );
};

export default NotFoundPage;
