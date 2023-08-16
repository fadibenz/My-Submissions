import axios from "axios";
const baseUrl = "http://localhost:3003";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/blogs`);
  return response.data;
};

const login = async (username, password) => {
  try {
    const response = await axios.post(`${baseUrl}/api/login`, {
      username: username,
      password: password,
    });
    setToken(response.data.token);
    window.localStorage.setItem(
      "loggedBlogappUser",
      JSON.stringify(response.data)
    );
    return response.data;
  } catch (error) {
    return null;
  }
};

const Create = async (blogData) => {
  const config = {
    headers: { Authorization: token },
  };
  const { author, title, url } = blogData;
  const response = await axios.post(
    `${baseUrl}/api/blogs`,
    {
      author: author,
      title: title,
      url: url,
    },
    config
  );
  return response.data;
};

const update = async (blog) => {
  try {
    const blogData = {
      ...blog,
      likes: blog.likes + 1,
    };
    const res = await axios.put(`${baseUrl}/api/blogs/${blog.id}`, blogData);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

const updateComments = async (blog, comment) => {
  try {
    const blogData = {
      ...blog,
      comments: blog.comments.concat(comment),
    };
    const res = await axios.put(`${baseUrl}/api/blogs/${blog.id}`, blogData);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  try {
    const res = await axios.delete(`${baseUrl}/api/blogs/${id}`, config);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

const getUsers = async () => {
  const response = await axios.get(`${baseUrl}/api/users`);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  login,
  setToken,
  Create,
  update,
  deleteBlog,
  getUsers,
  updateComments
};
