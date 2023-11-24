import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/card'

function App() {
  const [count, setCount] = useState(0)
  let myObj = {
    username: "abhishek",
    age:20
  }
  let newArr = [1,2,3,4]
  return (
    <>
      <h1 className='bg-green-400 text-black p-4 rounded-xl mb-4'>Tailwind Test</h1>
      <Card username="abhishek sharma" btnText ="Click me"/>     
      <Card username="chop" btnText = "Visit me"/>     
    </>
  )
  //someObj = {newArr}  - we can pass obj or array in this form, in place of like username
  //we can use Card many times and can change using props
}

export default App
