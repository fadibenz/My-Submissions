import "./styles/App.css";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./reducers/userReducer";
import { intializeBlogs } from "./reducers/blogReducer";
import { Route, Routes, useMatch } from "react-router-dom";

import blogService from "./services/blogs";

import Notification from "./components/Notification";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";
import Register from "./pages/Register";
import Menu from "./components/Menu";
import Search from "./pages/Search";
import Loading from "./components/Loading";
import Layout from "./components/Layout";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  const matchB = useMatch("/blog/:id");
  const chosenBlog = matchB
    ? blogs.find((blog) => blog._id === matchB.params.id)
    : null;

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const User = JSON.parse(loggedUserJSON);
      dispatch(setUser(User));
      blogService.setToken(User.token);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(intializeBlogs());
  }, [dispatch]);

  if (blogs.length === 0 || !blogs || (!chosenBlog && matchB)) {
    return (
      <>
        <Notification />
        <Loading />
      </>
    );
  }

  return (
    <div>
      <div className='container lg:p-12 '>
        <Notification />
        <Menu />
        <Routes>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Layout />}>
            <Route path='/' element={<Blogs />} />
            <Route path='/blog/:id' element={<Blog blog={chosenBlog} />} />
            <Route path='/search' element={<Search />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
