import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateVote } from "../reducers/anecdoteReducer";
import { compareFn } from "../helper";
import { setNotification } from "../reducers/notificationReducer";

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => {
    return state.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
      )
      .sort(compareFn);
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(updateVote(anecdote));
    dispatch(setNotification(`You voted ${anecdote.content}`, 5));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
}
