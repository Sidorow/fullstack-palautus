import { useState } from 'react'

//const Display = props => <div>{props.text}{props.value}</div>

const Button = (props) => {
  return ( <button onClick={props.handleClick}>
    {props.text}
  </button>
  )
}

const Statistics = (props) => {
  if (props.allnum == 0) {
    return (
      <div>
        <h2>No feedback given</h2>
      </div> 
    )
  }
  return (
    <div>
      <h2>Statistics</h2> <br/>
      <StatisticLine text="good" value={props.good}/>
      <StatisticLine text="neutral" value={props.neutral}/>
      <StatisticLine text="bad" value={props.bad}/> 
      <StatisticLine text="all" value={props.allnum}/> 
      <StatisticLine text="average" value={props.sum / props.allnum}/> 
      <StatisticLine text="positive in %" value={props.good / props.allnum * 100}/>
    </div> 
    )
}

const StatisticLine = (props) => <div>{props.text} {props.value}</div>

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const sum = good * 1 + neutral * 0 + bad * -1


  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good"/>
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics allnum={all} good={good} neutral={neutral} bad={bad} sum={sum}/>   
    </div>
  )
}

export default App
