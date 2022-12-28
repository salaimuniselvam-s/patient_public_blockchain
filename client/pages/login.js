import { useRouter } from 'next/dist/client/router';
import React, { useRef, useState } from 'react'
import { Modal } from 'react-modal';
import { useGlobalContext } from '../context';
import Cookies from 'js-cookie'
const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [comment, setComment] = useState("");
  const { walletAddress } = useGlobalContext();
  const router = useRouter();
  const userRef = useRef(null);
  const passwordRef = useRef(null)
  const login = async () => {
    if (user == "" ) {
      userRef.current.focus();
    } else if (password == '') {
      passwordRef.current.focus();
    }
    else {
      const objectWithData = {
        username: user?.replace(/\s/g, ""),
        password: password?.replace(/\s/g, ""),
        etherId: walletAddress || 0
      }
      const response = await fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objectWithData),
      })
      const { message, code } = await response.json()
      if (code == '001') {
        setUser('');
        setPassword('');
        router.push('/patientinfo')
        Cookies.set("loggedin", "true");
      }
      else if (code == '002') {
        setUser('');
        setPassword('');
        router.push('/hospitalinfo')
      }
      else if (code == '003') {
        setUser('');
        setPassword('');
        router.push('/pharmainfo')
      }
      else {
        setUser('');
        setPassword('');
        setComment(message)
        router.push('/')
      }
    }
    }
  return (
    <div className=" flex justify-center h-96">
    <div className="mt-24 w-3/5 rounded-md  bg-slate-400 border  border-slate-500 h-full">
      <div className=" flex justify-center text-3xl mt-5 mb-5">Login </div>
        <label  className=" text-2xl ml-3">Username</label>
        <br/>
        <input ref={userRef} type='text' className="w-4/5 rounded-md flex  px-3  ml-24 mt-3 py-2" value={user} placeholder={"Enter Username"} onChange={(e)=>setUser(e.target.value)}/>
      <br />
        <label className=" text-2xl ml-3">Password</label>
        <br/>
        <input value={password} ref={passwordRef }type='password' className="w-4/5 mt-3 px-3 py-2 rounded-md flex  ml-24" placeholder={"Enter Password"} onChange={(e) => setPassword(e.target.value)} />
        <span className="flex justify-center text-red-600">{comment}</span>
        <br />
        <button onClick={login} className="ml-24 border   px-5 rounded-md bg-blue-600 border-blue-600">Login</button>
    </div>
  </div>);
}

export default Login