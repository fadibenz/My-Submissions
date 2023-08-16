import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const addAnec = async (content) => {
  const res = await axios.post(baseUrl, content);
  console.log("res.data", res.data);
  return res.data;
};

export const update = async (anecdote) => {
  try {
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
