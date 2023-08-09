import { useState } from 'react';
function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
  });
  const Check = (num) => (num < anecdotes.length ? num + 1 : 0);
  const [max, setMax] = useState({ index: 0, votes: 0 });

  const mostVotes = () => {
    if (votes[selected] > max.votes)
      setMax({ index: selected, votes: votes[selected] });
  };

  console.log(selected);
  console.log(anecdotes.length);

  return (
    <>
      <div>{anecdotes[selected]}</div>
      <p>has {votes[selected]} votes </p>
      <button onClick={() => setSelected(Check(selected))}>
        next anecdote
      </button>
      <button
        onClick={() => {
          setVotes({ ...votes, [selected]: votes[selected] + 1 });
          mostVotes();
        }}
      >
        Vote
      </button>
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[max.index]}</p>
    </>
  );
}

export default App;
