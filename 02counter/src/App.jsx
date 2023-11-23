import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  let [counter, setCounter] = useState(0)     //using hooks - to update values in the UI
  //let counter = 0
  const addValue = () =>
{
  // counter = counter + 1;
  setCounter(counter + 1)
}
const removeValue = () =>
{
  // counter = counter + 1;
  if(counter <= 0) return    //to stop from going value of counter negative
  else{
    setCounter(counter - 1)
  }
}
  return (
    <>
      <h1>Counter</h1>
      <h2>Counter value: {counter}</h2>
      <button 
      onClick={addValue}>Increase value</button>
      <br />
      <button
      onClick={removeValue}>Decrease value</button>
    </>
  )
}

export default App
