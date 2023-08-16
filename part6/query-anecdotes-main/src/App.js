import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getAll, update } from "./services";
import NotifContext, { useNotif } from "./NotificationContext";
const App = () => {
  const queryClient = useQueryClient();

  const result = useQuery("anecdotes", getAll);
  
  const newAnecMutation = useMutation(update, {
    onSuccess: (newAnec) => {
      const anecdotes = queryClient.getQueryData("anecdotes");
      console.log('anecdotes', anecdotes)
      const newData = anecdotes.map((f) => (f.id === newAnec.id ? newAnec : f));
      queryClient.setQueryData("anecdotes", newData);
    },
  });
  
  // const setNotif = useNotif();
  const [notification, dispatchNotification] = useContext(NotifContext);
  const handleVote = (anecdote) => {
    newAnecMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    dispatchNotification({
      type: "SET_NOTIF",
      payload: `Voted for ${anecdote.content}`,
    });
  };
  
  if (result.isLoading) {
    return <div>is loading.....</div>;
  }

  if (result.isError) {
    return <div>anecdote service not available due to server problem</div>;
  }
  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm />
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
