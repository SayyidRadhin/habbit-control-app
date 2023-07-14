import { Link } from 'react-router-dom'
import "../habbit/habit.css"
import {motion as m} from "framer-motion"
import "./login.css"
import { useModal } from '../../contexts/ModalContext'
import { ModalProps } from '../../components/modal/Modal'

function LoginPage({setShowModal,setPage}:ModalProps) {

  // const {setShowModal} = useModal()

  const handleLogin = () => {
    setShowModal(true)
    setPage(2)   
  }  

  return (
    <div className="backround" style={{overflow:"hidden"}}>
    <m.div
        initial={{y:"7%",opacity:"0"}}
        animate={{y:"0%",opacity:"1",transition:{duration:0.5,ease:'easeOut'}}}
        exit={{opacity:0,transition:{duration:1}}} 
        className='habit-container'
      > 
            <div className="login-page">
                <h1>Please Login To Get Start</h1>
                <button onClick={handleLogin}>Login</button>
            </div>
         
    </m.div>
    </div>
  )
}

export default LoginPage