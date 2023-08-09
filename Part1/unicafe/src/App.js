import { useState } from 'react';

const Statistics = ({ good, bad, neutral }) => {
  let total = good + bad + neutral;
  return (
    <table>
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='Average' value={(good - bad) / total} />
      <StatisticLine text='Positive Feedback' value={(good * 100) / total} />
    </table>
  );
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ text, click, handleClick }) => {
  return <button onClick={() => handleClick(click + 1)}>{text}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text='Good' click={good} handleClick={setGood} />
      <Button text='Neutral' click={neutral} handleClick={setNeutral} />
      <Button text='Bad' click={bad} handleClick={setBad} />
      <h1>Statistics</h1>
      {bad !== 0 || good !== 0 || neutral !== 0 ? (
        <Statistics good={good} bad={bad} neutral={neutral} />
      ) : (
        <p>No Feedback Given</p>
      )}
    </div>
  );
};

export default App;
