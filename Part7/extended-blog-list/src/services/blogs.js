import axios from "axios";
const baseUrl = "http://localhost:3003";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/blogs`);
    return response.data;
  } catch (error) {
    console.log('error1', error)
    return error;
  }
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
    return error.response.data;
  }
};

const register = async (name, username, email, password) => {
  try {
    const response = await axios.post(`${baseUrl}/api/users`, {
      username: username,
      email: email,
      name: name,
      password: password,
    });
    setToken(response.data.token);
    window.localStorage.setItem(
      "loggedBlogappUser",
      JSON.stringify(response.data)
    );
    return response.data;
  } catch (error) {
    console.log("error", error);
    return error.response.data;
  }
};

const Create = async (blogData) => {
try {
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
} catch (error) {
  console.log('error', error)
}
};

const update = async (blog) => {
  try {
    const blogData = {
      ...blog,
      likes: blog.likes + 1,
    };
    const res = await axios.put(`${baseUrl}/api/blogs/${blog._id}`, blogData);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};

const updateComments = async (blog, comment) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const blogData = {
      ...blog,
      comment: comment,
    };
    const res = await axios.put(
      `${baseUrl}/api/blogs/${blog._id}`,
      blogData,
      config
    );
    return res.data;
  } catch (error) {
    return error.response.data;
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


// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getAll,
  register,
  login,
  setToken,
  Create,
  update,
  deleteBlog,
  updateComments,
};
