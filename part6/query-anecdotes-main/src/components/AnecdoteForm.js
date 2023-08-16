import {  useMutation, useQueryClient } from "react-query";
import { addAnec } from "../services";
import { useNotif } from "../NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newNoteMutation = useMutation(addAnec, {
    onSuccess: (newAnec) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      queryClient.setQueryData("anecdotes", anecdotes.concat(newAnec));
    },
  });

  const dispatchNotif = useNotif()
  
  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatchNotif({
      type: "SET_NOTIF",
      payload: `you added ${content}`,
    });
    newNoteMutation.mutate({ content, votes: 0 });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
