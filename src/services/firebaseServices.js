import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase.config'

export const emailRx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
export const passwordRx = new RegExp(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/);

export const signup = async(email,password,setMessage) =>{
    try {
        const reg = await createUserWithEmailAndPassword(auth,email,password)
        return reg
    } catch (error) {
        console.log(error.message)
        return setMessage(error.message)
    }
}

export const login = async(email,password,setMessage) => {
    try {
        const log = await signInWithEmailAndPassword(auth,email,password)
        return log
    } catch (error) {
        console.log(error.message)
        return setMessage(error.message)
    }
}