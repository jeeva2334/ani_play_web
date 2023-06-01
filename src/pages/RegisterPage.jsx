import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import sa from '../assets/as.webp'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import { Divider } from 'antd'
import { emailRx, passwordRx, signup } from '../services/firebaseServices'

function RegisterPage() {
    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password,setpassword] = useState("");
    const [Cpassword,setCpassword] = useState("");
    const [message,setMessage] = useState("");
    const handleSignup = async() =>{
        if(!emailRx.test(email)){
            return setMessage("Enter a proper email")
        }
        if(!passwordRx.test(password)){
            return setMessage("Enter a Strong password")
        }
        if(password !== Cpassword){
            return setMessage("Password not matched")
        }
        try {
            const res = await signup(email,password,setMessage)
            console.log(res)
            if(res.user){
                navigate('/login')
            }
        } catch (error) {
            console.log(error.FirebaseError)
        }
    }

    return (
        <div>
            <Navbar />
            <div className='md:h-screen h-full flex justify-center items-center p-7'>
                <div className='flex flex-col-reverse md:flex-row rounded-xl md:h-[46.7rem] bg-white md:w-[70rem]'>
                    <div className='flex flex-col p-10 md:w-1/2'>
                        <h1 className='text-4xl font-bold'>Ani-Play</h1>
                        <h1 className='text-3xl mt-4 underline font-bold'>Register</h1>
                        <div className='md:mt-10 mt-8'>
                            <label className='font-bold text-xl block'>Email :</label>
                            <input placeholder="Enter your Email..." className="input1 mt-5 w-full" name="text" type="text" onChange={(e)=>setEmail(e.target.value)} value={email} />
                        </div>
                        <div className='md:mt-5 mt-8'>
                            <label className='font-bold text-xl block'>Password :</label>
                            <input placeholder="**********" className="input1 mt-5 w-full" name="text" type="password" onChange={(e)=>setpassword(e.target.value)} value={password}/>
                        </div>
                        <div className='md:mt-5 mt-8'>
                            <label className='font-bold text-xl block'>Confirm Password :</label>
                            <input placeholder="**********" className="input1 mt-5 w-full" name="text" type="password" onChange={(e)=>setCpassword(e.target.value)} value={Cpassword} />
                        </div>
                        <button class="button1 md:mt-5 mt-8" onClick={handleSignup}>
                            Register
                        </button>
                        <Divider>or</Divider>
                        <div className='flex justify-center items-center'>
                        <a class="playstore-button" href="#">
                            <FaGoogle />
                            <span class="texts">
                                <span class="text-2">Sign up with google</span>
                            </span>
                        </a>
                        </div>
                        <h1 className='text-center mt-10'>
                            Have a account ?&nbsp; <Link to='/login' className='text-blue-500 hover:text-blue-700'>Login</Link>
                        </h1>
                       {message&&<div className='bg-red-500 w-full h-12 flex justify-center items-center rounded-md text-red-900 p-4'>
                            {message}
                        </div>}
                    </div>
                    <div className='md:w-1/2'>
                        <img src={sa} className='md:h-[46.7rem] md:rounded-r-xl rounded-b-xl w-full' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage