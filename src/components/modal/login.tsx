import React, {FormEvent, useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { TextField } from '@mui/material';
import axios from "axios"
import { useAuth } from '../../contexts/UserContext';

type ModalPropsLogin ={
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>;
    setPage: React.Dispatch<React.SetStateAction<number>>
}

function Login({setShowModal,setPage}:ModalPropsLogin) {
  const {createUser} = useAuth()
  const [email, setemail] = useState("")
  const [password, setpassword] = useState('')
  const [disable, setdisable] = useState(true)


  const handleSubmit =async (e:FormEvent) => {
    e.preventDefault()
    
    try {

    const response = await axios.post("http://localhost:8800/api/auth/login",{username:email,password:password})
    console.log(response);
    createUser(response.data.username)
    setTimeout(() => {
      setShowModal(false)
    }, 2000);
      
    } catch (error) {    
      console.log(error);  
    }

  }
  return (
    <>
     <motion.div className="register-login">
              <TextField
                type='email'
                value={email}
                placeholder='example@gmail.com'
                onChange={ (e) => setemail(e.target.value)}
                id="standard-basic"
                inputProps={{ pattern: '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$' }}
                label="Email"
                variant="outlined"
              />
              <TextField
                placeholder='password'
                value={password}
                type='password'
                onChange={(e)=> {
                  setpassword(e.target.value)
                  if (email && password !== "") {
                      setdisable(false)
                  }
                }}
                id="standard-basic"
                label="password"
                variant="outlined"
              />
              <button
                type="submit"
                className="submit-button"
                onClick={handleSubmit}
              >
                login
              </button>
              <p>Dont you registered <span onClick={()=> setPage(1)}>register</span></p>
            </motion.div>
    </>
  )
}

export default Login