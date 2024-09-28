import { useState } from "react";
import PropTypes from "prop-types";

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value % 1 === 0 ? value : value.toFixed(1)}{" "}
        {text === "positive" ? "%" : ""}
      </td>
    </tr>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <>
      <h3>statistics</h3>
      <table>
        <tbody>
          {good + neutral + bad > 0 ? (
            <>
              <StatisticsLine text="good" value={good} />
              <StatisticsLine text="neutral" value={neutral} />
              <StatisticsLine text="bad" value={bad} />
              <StatisticsLine text="all" value={good + neutral + bad} />
              <StatisticsLine
                text="average"
                value={
                  good > 0 || bad > 0
                    ? (good - bad) / (good + neutral + bad)
                    : 0
                }
              />
              <StatisticsLine
                text="positive"
                value={
                  good > 0 || bad > 0
                    ? (good / (good + bad + neutral)) * 100
                    : 0
                }
              />
            </>
          ) : (
            <tr>
              <td>
                <p>No feedback given</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

StatisticsLine.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

Statistics.propTypes = {
  good: PropTypes.number.isRequired,
  neutral: PropTypes.number.isRequired,
  bad: PropTypes.number.isRequired,
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h3>give feedback</h3>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
