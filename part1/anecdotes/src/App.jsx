import { useState } from "react";
import PropTypes from "prop-types";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const AnecdoteOfTheDay = ({ anecdotes, selected, points }) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
    </div>
  );
};

const MostVotedAnecdote = ({ anecdotes, points }) => {
  return (
    <div>
      <h3>Anecdote with most votes</h3>
      <p>{anecdotes[points.indexOf(Math.max(...points))]}</p>
    </div>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

AnecdoteOfTheDay.propTypes = {
  anecdotes: PropTypes.array.isRequired,
  selected: PropTypes.number.isRequired,
  points: PropTypes.array.isRequired,
};

MostVotedAnecdote.propTypes = {
  anecdotes: PropTypes.array.isRequired,
  points: PropTypes.array.isRequired,
};

const App = () => {
  const [selected, setSelected] = useState(Math.floor(Math.random() * 7));
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * 7));
  };

  const handleVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
  };

  return (
    <div>
      <AnecdoteOfTheDay
        anecdotes={anecdotes}
        selected={selected}
        points={points}
      />
      <Button onClick={handleVote} text="vote" />
      <Button onClick={randomAnecdote} text="next anecdote" />
      <MostVotedAnecdote anecdotes={anecdotes} points={points} />
    </div>
  );
};

export default App;
