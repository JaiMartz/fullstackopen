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
      <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick ={handleClick}>{text}</button>
  )
}

export default App
