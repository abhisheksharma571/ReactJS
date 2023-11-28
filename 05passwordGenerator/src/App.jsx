import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const [copyEffect, setCopyEffect] = useState(false);

  // useRef is a React Hook that lets you reference a value that’s not needed for rendering
  // const ref = useRef(initialValue)
  const passwordRef = useRef(null)


  // useCallback is a React Hook that lets you cache a function definition between re-renders
  // const cachedFn = useCallback(fn, dependencies)
  const passwordGenerator = useCallback(() => {69
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numberAllowed) str+= "0123456789"
    if(charAllowed) str+= "!@#$%^&*()_+{}[]|?';:><`~"

    for(let i=1;i<=length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed, setPassword])
  //optimisation - put into your cache

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();     //to show selected effect on text when we copy text
    passwordRef.current?.setSelectionRange(0,99);   //to select in a particular range
    window.navigator.clipboard.writeText(password)   //copy to clipboard 
    setCopyEffect(true);
    setTimeout(() => setCopyEffect(false), 200); // Reset after 200 miliseconds
  }, [password])

  // useEffect is a React Hook that lets you synchronize a component with an external system.
  // useEffect(setup, dependencies?)
  useEffect(() => {passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])
  //agr in depencies me kuchh bhi chhed chhad ho t dubara se run kar do


  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'> 
        <h1 className='text-white text-center my-3'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
          type="text" 
          value={password} 
          className='outline-none w-full py-1 px-3' 
          placeholder='password'
          readOnly
          ref={passwordRef}
          />
          <button 
          className={`outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 ${copyEffect ? 'copy-effect' : ''}`}
          onClick={copyPasswordToClipboard}
          >
            <img className='h-5' src="../copy.png" alt="Copy"></img>
          </button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer' 
            onChange={(e) => {setLength(e.target.value)}}
            />
            <label>Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox"
              defaultChecked={numberAllowed}
              id='numberInput'
              onChange={() => {
                setNumberAllowed((prev) => !prev);       //reverse its state - false to true and true to false
            }}
             />
             <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type="checkbox" 
              defaultChecked={charAllowed} 
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
            }}
             />
             <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
