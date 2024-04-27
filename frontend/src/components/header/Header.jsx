import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../redux/apiCalls/postsApiCall";

import HeaderLeft from "./HeaderLeft";
import NavItems from "./NavItems";
import MobileMenuBtn from "./MobileMenuBtn";
import "./header.css";
import SearchBar from "../searchBar/SerachBar";

const Header = () => {
  const dispatch = useDispatch();
  const { posts, searchBar } = useSelector((state) => state.post);
  const [search, setSearch] = useState();

  useEffect(() => {
    if (search == "") {
      dispatch(getAllPosts());
    }
    if (search) {
      dispatch(getAllPosts(search));
    }
  }, [search]);
  const [toggle, setToggle] = useState(false);
  return (
    <>
      <header id="main-header">
        <HeaderLeft />
        {/* <input
          placeholder="Search..."
          id="search-bar"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        /> */}

        {searchBar && <SearchBar id={"search-bar"} setSearch={setSearch} />}
        <NavItems setToggle={setToggle} />
        <MobileMenuBtn toggle={toggle} setToggle={setToggle} />
      </header>
      <aside className={toggle ? "open" : ""} id="mobile-menu">
        <NavItems setToggle={setToggle} />
      </aside>
    </>
  );
};

export default Header;
