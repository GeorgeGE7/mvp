import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostList from "../../components/posts/PostList";
import { getAllPosts } from "../../redux/apiCalls/postsApiCall";
import "./allProducts.css";
import "./products.css";

import { categories } from "../../dummyData";
import { postActions } from "../../redux/slices/postSlice";
import { getAllCategories } from "../../redux/apiCalls/categoryApiCall";

const HomePage = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { categories } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(postActions.setSearchBar());
    dispatch(getAllPosts());
    dispatch(getAllCategories());
  }, []);

  return (
    <main>
      <section id="categories-sidebar">
        <h2>Categories</h2>
        <ul>
          {categories?.map((category) => (
            <Link
              key={category?._id}
              className="btn-alt categories-sidebar-link"
              to={`/posts/categories/${category?.title}`}
            >
              {category?.title}
            </Link>
          ))}
        </ul>
      </section>
      <PostList title={"All Products"} posts={posts} />
    </main>
  );
};

export default HomePage;
