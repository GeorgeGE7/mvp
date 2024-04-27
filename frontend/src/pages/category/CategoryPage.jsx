import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCategoryPosts } from "../../redux/apiCalls/postsApiCall";
import PostList from "../../components/posts/PostList";
import "./category.css";
import { postActions } from "../../redux/slices/postSlice";

const CategoryPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(postActions.hideSearchBar());
  }, []);

  const { category } = useParams();
  const { postsCategory } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getCategoryPosts(category));
  }, [category]);

  return (
    <main style={{ display: "grid" }}>
      <section className="category">
        {postsCategory?.length === 0 ? (
          <>
            <h2 id="category-not-found">
              Products on <span>{category}</span> not found!
            </h2>
            <Link className="btn category-not-found-link" to="/">
              Back to home
            </Link>
          </>
        ) : (
          <PostList title={category} posts={postsCategory} />
        )}
      </section>
    </main>
  );
};

export default CategoryPage;
