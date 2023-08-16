import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(setNotification(`you added ${content}`, 5));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
}
