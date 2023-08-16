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

const login = async (username, password, setMessage, setStatus) => {
  timeout(setMessage, setStatus);
  try {
    const response = await axios.post(`${baseUrl}/api/login`, {
      username: username,
      password: password,
    });
    setToken(response.data.token);
    return response.data;
  } catch (error) {
    setMessage("Wrong Username or Password");
    setStatus("error");
    return null;
  }
};

const Create = async (blogData, setMessage, setStatus) => {
  timeout(setMessage, setStatus);
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
  setMessage(`Added ${title} by ${author}`);
  setStatus("success");
  return response.data;
};

const update = async (blogData, id) => {
  try {
    const res = await axios.put(`${baseUrl}/api/blogs/${id}`, blogData);
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

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, login, setToken, Create, update, deleteBlog };

const timeout = (setMessage, setStatus) => {
  setTimeout(() => {
    setMessage(null);
    setStatus(null);
  }, 5000);
};
