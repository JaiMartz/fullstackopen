import {useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    const updatedGood = good + 1;
    setGood(updatedGood);
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1;
    setNeutral(updatedNeutral);
  }

  const handleBad = () => {
    const updatedBad = bad + 1;
    setBad(updatedBad);
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text={'good'}></Button>
      <Button handleClick={handleNeutral} text={'neutral'}></Button>
      <Button handleClick={handleBad} text={'bad'}></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

//components
const Statistics = ({good, bad, neutral}) => {

  if (good === 0 && neutral === 0 && bad === 0) {
    return (
    <div>
      <h2>statistics</h2>
      <p>No feedback given</p>
    </div>
    )
  }

  return (
    <div>
      <h2>statistics</h2>
      <table>
        <tbody>
        <StatisticLine text={'good'} value={good}></StatisticLine>
        <StatisticLine text={'neutral'} value={neutral}></StatisticLine>
        <StatisticLine text={'bad'} value={bad}></StatisticLine>
        <StatisticLine text={'all'} value={good + neutral + bad}></StatisticLine>
        <StatisticLine text={'average'} value={calculateAverage(good, neutral, bad)}></StatisticLine>
        <StatisticLine text={'positive'} value={calculatePositivePercentage(good, neutral, bad) + ' %'}></StatisticLine>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick ={handleClick}>{text}</button>
  )
}

//utility functions
const calculateAverage = (good, neutral, bad) => {
  return (good - bad) / (good + neutral + bad || 1);
}

const calculatePositivePercentage = (good, neutral, bad) => {
  return good / (good + neutral + bad || 1) * 100;
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>

  )
}

export default App
