import { createSlice } from "@reduxjs/toolkit";
import { getAll, addAnec, update } from "../services/anecService";

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    setVote(state, action) {
      return state.map((f) =>
        f.id === action.payload.id ? action.payload : f
      );
    },
    apppendAnec(state, action) {
      return state.concat(action.payload);
    },
    setAnec(state, action) {
      return action.payload;
    },
  },
});

export const { setVote, setAnec, apppendAnec } = anecdoteSlice.actions;

export const intializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await getAll();
    dispatch(setAnec(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const res = await addAnec(anecdote);
    dispatch(apppendAnec(res));
  };
};

export const updateVote = (anecdote) => {
  return async (dispatch) => {
    const res = await update(anecdote);
    dispatch(setVote(res));
  };
};

export default anecdoteSlice.reducer;
