import { useCallback, useEffect, useRef, useState } from 'react'


function App() {

const [numberAllowed, setNumberAllowed]=useState(false);
const [charactersAllowed,setCharactersAllowed]=useState(false);
const [length,setLength]=useState(8);
const [password, setPassword]=useState(null);
const [bgColor, setBgColor]=useState("white");
const passwordgenerator= useCallback(()=>{
  let pass=''
  let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlmnopqrstuvwxyz'
  if(numberAllowed) str+='0123456789'
  if(charactersAllowed) str+='!@#$%^&*()'
  for(let i=1;i<=length;i++){
    let char=Math.floor(Math.random()*str.length+1)
    pass+=str.charAt(char);
  }
  setPassword(pass);
}, [numberAllowed,charactersAllowed,length]) 
useEffect(()=>{
  passwordgenerator();
},[length,numberAllowed,charactersAllowed])

const passwordRef =useRef(null)

const copyPassword=()=>{
   passwordRef.current?.select();
  window.navigator.clipboard.writeText(password);

  alert("password copied to clipboard")
}
const changebgColor=()=>{
  setBgColor((bgColor)=>bgColor==="white"?"black":"white")
}
  return (
    <>
    <div className=' w-full h-screen' style={{backgroundColor:bgColor}} >
     <button onClick={changebgColor} className=' bg-slate-700 m-4 p-2 absolute text-white right-2  '  >{bgColor=="white"?'LightMode':'DarkMode'}</button>
    <div className=' flex justify-center  w-full h-screen' style={{backgroundColor:bgColor}} >
    
    <div  className='flex flex-col  items-center bg-gray-800 w-1/2 h-fit p-4 m-10'>
     <h1 className=' text-white text-3xl ' >Password generator </h1>
     <div className=' mt-4  flex w-full'>  
     <input   value={password} readOnly ref={passwordRef} className='w-full p-4 outline-none border-collapse '></input>
     <button onClick={copyPassword} className=' p-2 px-4 text-white text-xl font-bold bg-green-900 hover:bg-blue-600'> Copy </button>
     </div>
     <div className='flex gap-12 flex-wrap justify-center text-white mt-4 '> 
     <div>   
      <input type='range' value={length} onChange={(e)=>{setLength(e.target.value)}}  min={8} max={100} ></input>
      <label htmlFor='length'>length:{length} </label></div>
    <div>  
    <input onClick={()=>{setNumberAllowed((prev)=>!prev)}} value={numberAllowed} type='checkbox'></input>
       <label> Numbers </label></div>
     <div> 
      <input value={charactersAllowed} onClick={()=>{setCharactersAllowed((prev)=>!prev)}}  type='checkbox'></input>
       <label> Characters</label>
</div>
     
     </div>
   
       <div>
       </div>
     </div>
     </div>
     </div>
    </>
  )
}

export default App
