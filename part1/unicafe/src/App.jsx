import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      {/* I need to limit the amount of decimals to 1 */}
      <td>
        {value.toFixed(1)} {text === "positive" ? "%" : ""}
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
            <p>No feedback given</p>
          )}
        </tbody>
      </table>
    </>
  );
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
