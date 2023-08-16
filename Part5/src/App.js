import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import "./App.css";
import Togglable from "./components/Togglable";
import CreateBlog from "./components/CreateBlog";
import { compareFn } from "./util/helper";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const User = JSON.parse(loggedUserJSON);
      setUser(User);
      blogService.setToken(User.token);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBlogs = await blogService.getAll();
        fetchedBlogs.sort(compareFn);
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.clear();
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      console.log("username", username);
      console.log("password", password);
      const User = await blogService.login(
        username,
        password,
        setMessage,
        setStatus
      );
      if (User) {
        setUser(User);
        blogService.setToken(User.token);
        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(User));
        setPassword("");
        setUsername("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createBlog = async (blogData) => {
    try {
      const res = await blogService.Create(blogData, setMessage, setStatus);
      setBlogs(blogs.concat(res).sort(compareFn));
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLike = async (blogData, id) => {
    try {
      const res = await blogService.update(blogData, id);
      setBlogs(
        blogs
          .filter((f) => f.id != id)
          .concat(res)
          .sort(compareFn)
      );
    } catch (error) {
      console.log("error", error);
    }
  };
  const deleteBlog = async (blog) => {
    try {
      console.log("blog.user.id.toString()", blog.user.toString());
      console.log("user.id.toString()", user.id.toString());
      if (blog.user.toString() === user.id.toString()) {
        await blogService.deleteBlog(blog.id);
        const newfilter = blogs.filter((f) => f.id !== blog.id);
        setBlogs(newfilter.sort(compareFn));
      } else {
        setMessage("Can not delete this blog");
        setStatus("error");
        setTimeout(() => {
          setMessage(null);
          setStatus(null);
        }, 5000);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  if (user === null) {
    return (
      <div>
        <div className={status}>{message}</div>
        <h2>Log in to application</h2>
        <form onSubmit={(e) => handleSumbit(e)}>
          <div>
            <p>Username</p>
            <input
              id='username'
              type='text'
              value={username}
              onChange={(e) => {
                console.log("e.taget.value", e.target.value);
                setUsername(e.target.value);
              }}
            />
          </div>
          <div>
            <p>password</p>
            <input
              id='password'
              type='text'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input type='submit' value='login' />
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <div className={status}>{message}</div>
        <h2>blogs</h2>
        <>
          <p>{user.username} is logged in</p>
          <button onClick={handleClick}>log out</button>
        </>
        <Togglable buttonLabel='New Blog'>
          <CreateBlog createBlog={createBlog} user={user}></CreateBlog>
        </Togglable>
        <div id='blog'>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLike={handleLike}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      </div>
    );
  }
};

export default App;
