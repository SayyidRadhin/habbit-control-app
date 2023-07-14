import React, { FormEvent, SyntheticEvent, useRef, useState } from 'react'
import { Button, TextField ,Alert} from "@mui/material";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import axios from "axios"
import { ClipLoader } from 'react-spinners';
import { useAuth } from '../../contexts/UserContext';


type page = {
  setPage:React.Dispatch<React.SetStateAction<number>>
}


function Register({setPage}:page) {
  const {createUser} = useAuth()
  const [exist, setexist] = useState(false)
  const [email, setemail] = useState<String>("")
  const [password, setpassword] = useState('')
  const [username, setusername] = useState("")
  const [loading, setLoading] = useState(false);

  
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);



  const handleSubmit =async (e:FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log(email,password);

    let data = {
      username:username,
      email: email,
      password: password
    };
    
    try {

      axios.post("http://localhost:8800/api/auth/register",data).then((res)=>{
        console.log(res.data);
        console.log("hhh");
        setexist(res.data.exist)
        createUser(res.data.username)
      })
      checkValue()
      setemail("")
      setpassword("")
      setusername("")
      setLoading(false)
    } catch (error) {    
      console.log(error);  
    }

  }

  const checkValue =()=>{
      if (email && password !== null || undefined) {
          if (email.length >= 7 && exist==false) {
            setPage(2)

          }
      }
  }


  return (
    <>
      <motion.form className="register-login" >
       {exist && <Alert style={{backgroundColor:"red",color:"white",marginTop:"0em"}} >!User Already Exists</Alert>}
      {loading && (
        <ClipLoader color="#000" loading={loading} />
      )}  
             <TextField
                value={username}
                onChange={ (e) => setusername(e.target.value)}
                required
                id="standard-basic"
                label="UserName"
                type="text"
                variant="outlined"
                placeholder='username'
              />
             <TextField
                value={email}
                onChange={ (e) => setemail(e.target.value)}
                ref={emailRef}
                required
                id="standard-basic"
                label="Email"
                type='email'
                variant="outlined"
                placeholder='example@gmail.com'
              />

              <TextField
                value={password}
                onChange={(e)=> setpassword(e.target.value)}
                ref={passwordRef}
                required
                id="standard-basic"
                label="Password"
                variant="outlined"
                type='password'
                placeholder='password'
              />
              <button
                type="submit"
                className="submit-button"
                onClick={handleSubmit}
              >
                Register
              </button>
              <p>Already registered <span onClick={()=> setPage(2)}>Login</span></p>
            </motion.form>
        </>
  )
}

export default Register