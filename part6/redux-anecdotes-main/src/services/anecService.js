import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

export const addAnec = async (content) => {
  const anec = { content, votes: 0 };
  const res = await axios.post(baseUrl, anec);
  console.log("res.data", res.data);
  return res.data;
};

export const update = async (anecdote) => {
  console.log("anecdote", anecdote);
  const anec = {
    ...anecdote,
    votes: anecdote.votes + 1,
  };
  try {
    const res = await axios.put(`${baseUrl}/${anec.id}`, anec);
    return res.data;
  } catch (error) {
    console.log("error", error);
  }
};
