import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import sa from '../assets/sa.png'
import { Link, useNavigate } from 'react-router-dom'
import { Divider } from 'antd'
import { FaGoogle } from 'react-icons/fa'
import { login } from '../services/firebaseServices'

function LoginScreen() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setpassword] = useState("");
    const [message,setMessage] = useState("");
    const handleLogin = async() =>{
        try {
            const res = await login(email,password,setMessage)
            console.log(res)
            if(res.user){
                localStorage.setItem("user",res.user)
                navigate('/')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <Navbar />
            <div className='md:h-screen h-full flex justify-center items-center p-7'>
                <div className='flex flex-col md:flex-row rounded-xl md:h-[46.7rem] bg-white md:w-[70rem]'>
                    <div className='md:w-1/2'>
                        <img src={sa} className='md:rounded-l-xl rounded-b-xl w-full' />
                    </div>
                    <div className='flex flex-col p-10 md:w-1/2'>
                        <h1 className='text-4xl font-bold'>Ani-Play</h1>
                        <h1 className='text-3xl mt-4 underline font-bold'>Login</h1>
                        <div className='md:mt-10 mt-8'>
                            <label className='font-bold text-xl block'>Email :</label>
                            <input placeholder="Enter your Email..." className="input1 mt-5 w-full" name="text" type="text" onChange={(e)=>setEmail(e.target.value)} value={email} />
                        </div>
                        <div className='md:mt-10 mt-8'>
                            <label className='font-bold text-xl block'>Password :</label>
                            <input placeholder="**********" className="input1 mt-5 w-full" name="text" type="password" onChange={(e)=>setpassword(e.target.value)} value={password}/>
                        </div>
                        <button class="button1 md:mt-10 mt-8" onClick={handleLogin}>
                            Login
                        </button>
                        <Divider>or</Divider>
                        <a class="playstore-button" href="#">
                            <FaGoogle />
                            <span class="texts">
                                <span class="text-2">Sign up with google</span>
                            </span>
                        </a>
                        <h1 className='text-center mt-10'>
                            Don't have a account ?&nbsp; <Link to='/register' className='text-blue-500 hover:text-blue-700'>Register</Link>
                        </h1>
                        {message&&<div className='bg-red-500 w-full h-12 flex justify-center items-center rounded-md text-red-900 p-4'>
                            {message}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen