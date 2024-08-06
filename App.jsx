import { useCallback, useState, useRef } from 'react';
import { useEffect } from 'react';

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState('');
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const passref = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let num = "0123456789";
    let specialchar = "!@#$%^&*()_+";
    if (numberAllowed) str += num;
    if (charAllowed) str += specialchar;
    for (var i = 0; i < length; ++i) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed,setPassword])

  const copypasstoclipboard=()=>{
    passref.current?.select();
    var copyText = document.getElementById("myInput");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
  }

  useEffect(() => {
    passwordgenerator();
  }, [length, numberAllowed, charAllowed,passwordgenerator]);

  return (
    <>
      <div className=" w-6/12 h-36 bg-slate-900 rounded-md flex-col shadow-lg shadow-slate-400">
      
        <input className="w-96 h-11 bg-slate-400 rounded-xl mr-9 mt-7 text-lg text-black p-2 font-semibold" type="text" placeholder="Password" value={password} readOnly ref={passref}  id="myInput" />
        <button 
        onClick={copypasstoclipboard}
        className='ml-4 w-14 h-11 rounded-xl text-black bg-blue-200 p-2'> Copy</button>
        <div className='flex gap-x-4 text-sm text-white mt-7 p-2 ml-6'>
          <input type="range" min={8} max={16} value={length} className='ml-7 cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
          <label htmlFor="">Length:{length} </label>
          <input type="checkbox" name="" id="" defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }} />Number
          <input type="checkbox" name="" id="" defaultChecked={charAllowed}
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }} />Character
        </div>

      </div>
    </>
  )
}

export default App
