import "./App.css";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeUser, setUser } from "./reducers/userReducer";
import { intializeBlogs } from "./reducers/blogReducer";

import blogService from "./services/blogs";

import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import Users from "./components/Users";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import { Route, Routes, useMatch, useNavigate } from "react-router-dom";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const [userData, setUserData] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  const navigate = useNavigate();

  const match = useMatch("/user/:id");
  const chosenUser = match
    ? userData.find((user) => user.id === match.params.id)
    : null;

  const matchB = useMatch("/blog/:id");
  const chosenBlog = matchB
    ? blogs.find((blog) => blog.id === matchB.params.id)
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
    const fetchData = async () => {
      const res = await blogService.getUsers();
      setUserData(res);
    };
    fetchData();
  }, [dispatch]);

   useEffect(() => {
     dispatch(intializeBlogs());
   }, [dispatch]);

  const handleClick = () => {
    dispatch(removeUser());
    blogService.setToken(null);
    window.localStorage.clear();
  };

  if (user === null) {
    return <Login />;
  } else {
    return (
      <div>
        <Notification />
        <button onClick={() => navigate("/users")}>Users</button>
        <button onClick={() => navigate("/")}>Blogs</button>
        <button onClick={() => navigate("/create")}>create</button>
        <h2>blogs</h2>
        <>
          <p>{user.username} is logged in</p>
          <button onClick={handleClick}>log out</button>
        </>
        <Routes>
          <Route
            path='/create'
            element={
              <Togglable buttonLabel='New Blog'>
                <CreateBlog></CreateBlog>
              </Togglable>
            }
          />
          <Route path='/' element={<Blogs />} />
          <Route path='/users' element={<Users users={userData} />} />
          <Route path='/user/:id' element={<User user={chosenUser} />}></Route>
          <Route path='/blog/:id' element={<Blog blog={chosenBlog} />} />
        </Routes>
      </div>
    );
  }
};

export default App;
