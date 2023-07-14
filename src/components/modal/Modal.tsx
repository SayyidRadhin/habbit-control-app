import React, { FormEvent, useState } from "react";
import "./modal.css";
import { motion, AnimatePresence } from "framer-motion";
import Register from "./register";
import Login from "./login";
import AddHabbit from "./AddHabbit";

export type ModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal?: boolean;
  path?:string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page?:number
};

const backdrop = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modal = {
  hidden:{
    transition:{ delay: 0.5},
    opacity:0,
    y :"-100vh"
},
  visible:{
    y:0,
    opacity:1,
    transition:{ delay: 0.2}
  }

}

type InputsType = {
  [key: string]: JSX.Element;
};

function Modal({ setShowModal, showModal,setPage,page,path}: ModalProps) {

      const Inputs:InputsType = {
        1 : <Register setPage={setPage}/>,
        2 : <Login setShowModal={setShowModal} setPage={setPage}/>,
        3 : <AddHabbit setShowModal={setShowModal} path={path}/>
      }

      const handleClickOutside = (e):void =>{
          if (e.target.id === "modal") {
            setShowModal(false)
          }
      }
  return (
    <AnimatePresence>
      { showModal && (
          <motion.div className="backdrop" 
          variants={backdrop}
          initial='hidden'
          animate='visible'
          exit='hidden'
          id="modal"
          onClick={handleClickOutside}
          >
          <motion.div className="modal"
            variants={modal}
          >
            {Inputs[page]}
        
          </motion.div>
        </motion.div>
      )}
      
    </AnimatePresence>
  );
}

export default Modal;
