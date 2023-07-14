import { useEffect, useState } from "react";
import "./App.css";
import Habbit from "./pages/habbit/Habbit";
import Modal from "./components/modal/Modal";
import { Route, Routes, redirect } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import HabitDashboard from "./components/habbbit-dashboard/HabitDashboard";
import { AnimatePresence } from "framer-motion";
import LoginPage from "./pages/loginPage/login";
import { useAuth } from '../src/contexts/UserContext';


function App() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState<number>(2)
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  useEffect(() => {
    // Request permission for notifications
    if ('Notification' in window && window.Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);
  
  const {User} = useAuth()
  console.log(path);
  redirect
  return (
    <>
        <Modal setShowModal={setShowModal} showModal={showModal} page={page} setPage={setPage} path={path}/>
        <AnimatePresence >
        <Routes location={location} key={location.key}>
          <Route
            path="/"
            element={ User ? <Habbit setShowModal={setShowModal} showModal={false} /> : <LoginPage setPage={setPage} setShowModal={setShowModal}/>}
          />
          <Route path="/:id" element={User ? <HabitDashboard setPage={setPage} setShowModal={setShowModal} type={path} path={path}/> : <LoginPage setPage={setPage} setShowModal={setShowModal}/>} />
  

        </Routes>
        </AnimatePresence>
    </>
  );
}

export default App;
