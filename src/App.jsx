import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const[length, setLength] = useState(8)
  const[numberAllowed, setNumberAllowed] = useState(false)
  const[charAllowed, setCharAllowed] = useState(false)
  const[password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str += '0123456789'
    if(charAllowed) str += '!@#$%^&*()_+/<>'

    for(let i = 1; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllowed, charAllowed])


  // useEffect to run everytime there is some changes in length, numberAllowed or charAllowed

  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed])

  // This function is to copy the password to the clipboard

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  return (
    <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-6 py-7 bg-gray-800 text-orange-500'>
      <h1 className='text-white text-center my-3 text-xl font-semibold'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input 
        ref={passwordRef}
        type="text"
        className='w-full outline-none py-1 px-3'
        readOnly
        value={password}
        placeholder='Password'
        />
        <button 
        onClick={copyPassword}
        className='bg-blue-600 px-4 py-1 text-white active:bg-blue-700 duration-150'
        >Copy</button>
      </div>
      <div className='flex gap-x-3'>
        <div className='flex items-center gap-x-1'>
          <input type="range" 
          name="length" 
          id="length"
          className='cursor-pointer'
          min={8}
          max={20}
          value={length}
          onChange={(e) => setLength(e.target.value)}
          />
          <label htmlFor="length">Length: {length} </label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          className='cursor-pointer'
          defaultChecked={numberAllowed}
          onChange={() => setNumberAllowed((prev) => !prev)}  // This is to make sure that what ever the previous value is, on clicking the checkbox, we just reverse this
          />
          <label htmlFor="numbers">Numbers </label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          className='cursor-pointer'
          defaultChecked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}  // This is to make sure that what ever the previous value is, on clicking the checkbox, we just reverse this
          />
          <label htmlFor="characters">Characters </label>
        </div>
      </div>
    </div>
  )
} 

export default App
