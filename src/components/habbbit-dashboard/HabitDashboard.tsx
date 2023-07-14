import React, { useEffect, useState } from "react";
import "./habitDashbord.css";
import "../habbititems/habbititems.css";
import Profile from "../profile/Profile";
import { Avatar, Checkbox, Icon } from "@mui/material";
import { motion as m } from "framer-motion";
import "../../../images/icon-exercise.svg";
import HabbitsAdded from "./HabbitsAdded";
import axios, { AxiosResponse } from "axios";
import Habbit from "../../pages/habbit/Habbit";
import zIndex from "@mui/material/styles/zIndex";
import dayjs from "dayjs";

type props = {
  path: string;
  type: any;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export type HabitFormValues = {
  _id: string;
  name: string;
  startDate: Date | null;
  endDate: Date | null;
  reminderTime?: Date | null;
};

function HabitDashboard({ type, setPage, setShowModal, path }: props) {
  const [habbits, setHabbits] = useState<HabitFormValues[]>();
  const [load, setload] = useState<boolean>(false);
  const [completed, setcompleted] = useState(0)
  const [notCompleted, setnotCompleted] = useState(0)

  let todos;

  useEffect(() => {
    setTimeout(() => {
      setload(true);
    }, 3000);
  }, []);

  useEffect(() => {
    const getHabbits = async () => {
      const res = await axios.get("http://localhost:8800/api/habbit/" + path);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      todos = res.data;

      setHabbits(todos);
    };

    getHabbits();
  }, [habbits]);

  
  
  useEffect(() => {
    async function getChecked(): Promise<void> {

      const currentDate:string = dayjs(new Date()).format('YYYY-MM-DD');
      const pending =false
      const resTrue = await axios.get(`http://localhost:8800/api/completions/${path}/completion/true?completed=${pending}&currentDate=${currentDate}`);
      console.log(resTrue.data.length);
      setcompleted(resTrue.data.length)
      // const resFalse = await axios.get(`http://localhost:8800/api/completions/${path}/completion/false?completed=${pending}&currentDate=${currentDate}`);
      const falseValue = habbits?.length - resTrue.data.length
        setnotCompleted(falseValue)

      
      
    }
    getChecked()

  }, [path,habbits])

  const scheduleNotifications = () => {
    habbits?.forEach((habit: { reminderTime: any; name: any; }) => {
      const { reminderTime,name } = habit;
      
      // Calculate the time until the next reminder

      const now = dayjs(new Date()).format('HH:mm');
      // console.log(reminderTime,now);

      
      const timeDifference =  dayjs(now).diff(dayjs(reminderTime));
      // console.log(timeDifference);
      
      // Schedule the notification
      if (reminderTime == now) {
        setTimeout(() => {
          if (Notification.permission === 'granted') {
            const notification = new Notification('Habit Reminder', {
              body: `Remember to do your habit: ${name}`,
              icon: '/path/to/notification-icon.png',
            });

            // Optional: Handle click on the notification
            notification.onclick = () => {
              // Handle click event (e.g., navigate to the habit's details)
            };
          }
        }, timeDifference);
      }
    });
  };

  // Schedule notifications when the habits change
  scheduleNotifications();

  const handleAdd = (): void => {
    setPage(3);
    setShowModal(true);
  };

  let data;
  // console.log(data);

  switch (type) {
    case "work":
      data = {
        title: "Work",
        img: <img src="../../../images/icon-work.svg" alt="" />,
        color: "hsl(15, 100%, 70%)",
      };

      break;
    case "play":
      data = {
        title: "Play",
        img: <img src="../../../images/icon-play.svg" alt="" />,
        color: "hsl(195, 74%, 62%)",
      };
      break;
    case "study":
      data = {
        title: "Study",
        img: <img src="../../../images/icon-study.svg" alt="" />,
        color: "hsl(348, 100%, 68%)",
      };
      break;
    case "exercise":
      data = {
        title: "Exercise",
        img: <img src="../../../images/icon-exercise.svg" alt="" />,
        color: "hsl(145, 58%, 55%)",
      };
      break;
    case "social":
      data = {
        title: "Social",
        img: <img src="../../../images/icon-exercise.svg" alt="" />,
        color: "hsl(264, 64%, 52%)",
      };
      break;
    case "selfCare":
      data = {
        title: "Self Care",
        img: <img src="../../../images/icon-self-care.svg" alt="" />,
        color: "hsl(43, 84%, 65%)",
      };
      break;

    default:
      break;
  }
  //  console.log(data);

  return (
    <m.div className={`dashContainer ${load ? "loading" : ""}`}>
      <m.div
        initial={{ y: "100%", opacity: "0" }}
        animate={{ y: "0%", opacity: "1" }}
        transition={{ duration: 0.75, ease: "easeOut" }}
        exit={{
          opacity: 7,
          scale: 1,
          y: "100%",
          transition: { duration: 0.5 },
        }}
      >
        <div className="add-icon">
          <div className="flex-box-button">
            <div className="add-button" onClick={handleAdd}>
              Add
            </div>
          </div>
        </div>

        <div className="Dashboard">
          <h1>{data?.title}</h1>
          <div className="header-dashboard">
            <Profile />
            <div className="habbit-items">
              <div
                className="image-container"
                style={{ backgroundColor: data?.color }}
              >
                <div className="image-icon">{data?.img}</div>
              </div>
              <div className="habit-items-box">
                <div className="completed">
                  <h3>{completed}</h3>

                  <p>completed</p>
                </div>
                <div className="completed pending">
                  <h3>{notCompleted}</h3>
                  <p>pending</p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid">
            <div className="items-display">
              {habbits ? (
                Object.values(habbits).map((habit, index) => (
                  <HabbitsAdded habbit={habit} key={index} path={path} />
                ))
              ) : (
                <h1>not Found</h1>
              )}
            </div>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}

export default HabitDashboard;
