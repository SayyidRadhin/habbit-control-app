import React from 'react'
import './profile.css'
import { useAuth } from '../../contexts/UserContext';
import { Avatar } from '@mui/material';

type ModalProps = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function Profile({setShowModal}:ModalProps) {
  const {createUser,User} = useAuth()

  return (
    User ? (
    <div className='profile-box'>
      <div className="profile">
        <div className="profile-image" onClick={()=> setShowModal(true)}>
            <img src="..\images\image-jeremy.png" alt="" />
        </div>
        <div className="profile-name">
            <span>Report for</span>
            <h1>{User}</h1>
        </div>
      </div>
      <div className="select-option">
            <span>Daily</span>
            <span>Weekly</span>
            <span>Monthly</span>
        </div>
      </div>):(
        <div className="login-page">
          <button>login</button>
        </div>
      )
  )
}

export default Profile