import React from 'react'
import "./habit.css"
import Profile from '../../components/profile/Profile'
import Habbititems from '../../components/habbititems/Habbititems'
import { ModalProps } from '../../components/modal/Modal'
import { Link } from 'react-router-dom'
import {motion as m} from "framer-motion"


function Habbit({setShowModal}:ModalProps) {
  return (
    <div className="backround" style={{overflow:"hidden"}}>
    <m.div
        initial={{y:"7%",opacity:"0"}}
        animate={{y:"0%",opacity:"1",transition:{duration:0.5,ease:'easeOut'}}}
        exit={{opacity:0,transition:{duration:1}}} 
        className='habit-container'
      > 
      <div 
         
          className="grid-box"
        >
         <Profile setShowModal={setShowModal}/>
         <Link to={'/work'}><Habbititems type="work" /></Link>
         <Link to={'/play'}><Habbititems type="play"/></Link>
         <Link to={'/study'}><Habbititems type="study"/></Link>
         <Link to={'/exercise'}><Habbititems type="exercise"/></Link>
         <Link to={'/social'}><Habbititems type="social" /></Link>
         <Link to={'/selfCare'}><Habbititems type="selfCare"/></Link>
      </div>
    </m.div>
    </div>
  )
}

export default Habbit