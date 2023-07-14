import React from 'react'
import "./habbititems.css"
import { useNavigate } from 'react-router'
import {motion as m} from "framer-motion"
import { duration } from '@mui/material';

function Habbititems({type}:any) {

  let data;

  switch (type) {
    case "work":
       data ={
        title:"Work",
        img:(
            <img src="../../../images/icon-work.svg" alt="" />
            ),
        color: "hsl(15, 100%, 70%)",
        
       }
      
      break;
    case "play":
      data ={
        title:"Play",
        img:(
            <img src="../../../images/icon-play.svg" alt="" />
            ),
        color: "hsl(195, 74%, 62%)",
        
       }
     break;
     case "study":
      data ={
        title:"Study",
        img:(
            <img src="../../../images/icon-study.svg" alt="" />
            ),
        color: "hsl(348, 100%, 68%)",
        
       }
     break;
     case "exercise":
      data ={
        title:"Exercise",
        img:(
            <img src="../../../images/icon-exercise.svg" alt="" />
            ),
        color: "hsl(145, 58%, 55%)",
        
       }
     break;  
     case "social":
      data ={
        title:"Social",
        img:(
            <img src="../../../images/icon-Social.svg" alt="" />
            ),
        color: "hsl(264, 64%, 52%)",
        
       }
     break;
     case "selfCare":
      data ={
        title:"Self Care",
        img:(
            <img src="../../../images/icon-self-care.svg" alt="" />
            ),
        color: "hsl(43, 84%, 65%)",
        
       }
     break;      

    default:
      break;
  }

  return (
    <m.div
        initial={{scale:"1",y:"0%"}}
        transition={{duration:.3}}
        whileHover={{scale:"1",y:"-1.5%"}}
        className='habbit-items' 
      >
      <div className="image-container" style={{ backgroundColor: data?.color}}>
        <div className="image-icon">
           {data?.img}
        </div>     
      </div>
      <div className="habit-items-box">
            <div className="header">
              <h3>{data?.title}</h3>
            </div>
      </div>
    </m.div>
  )
}

export default Habbititems