import { useRef, useState } from 'react'
import './App.css'

function App() {
  const [time, setTime] = useState(0)
  let timerRef = useRef(null);

  function startTimer() {
    timerRef.current = setInterval(() => {
      setTime(time => time+1)
    }, 1000)
  }

  function stopTimer() {
    clearInterval(timerRef.current)
    timerRef.current = null
  }

  function resetTimer() {
    stopTimer()
    setTime(0)
  }

  return (
    <>
      <h1 className='bg-green-400 text-center font-bold mt-10 mx-10 text-black p-4 rounded-xl mb-4'>Stop Watch</h1>
      <div className='flex flex-col gap-5 justify-center items-center'>
        <p className='text-3xl'>StopWatch: {time} seconds</p>
        <button className='bg-green-400 px-3 py-1 rounded-lg' onClick={startTimer}>Start</button>
        <button className='bg-green-400 px-3 py-1 rounded-lg' onClick={stopTimer}>Stop</button>
        <button className='bg-green-400 px-3 py-1 rounded-lg' onClick={resetTimer}>Reset</button>
      </div>
    </>
  )
}

export default App
