import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const user = await blogService.login(username, password);
      setUser(user);
      setPassword("");
      setUsername("");
    } catch (error) {
      console.log(error);
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={(e) => handleSumbit(e)}>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.value)}
          >
            username
          </input>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.value)}
          >
            password
          </input>
          <input type='submit'>login</input>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }
};

export default App;
