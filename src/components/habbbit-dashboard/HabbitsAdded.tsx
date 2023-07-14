import { Checkbox } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { HabitFormValues } from "./HabitDashboard";
import axios from "axios";
import dayjs from "dayjs";
import { differenceInDays, parse } from 'date-fns';

type props = {
  habbit:HabitFormValues,
  path:string

}

function HabbitsAdded({habbit,path}:props) {
  const [Checked, setChecked] = useState<boolean>(false)



  useEffect(() => {
    async function getChecked(): Promise<void> {

      const currentDate:string = dayjs(new Date()).format('YYYY-MM-DD');

      const res = await axios.get(`http://localhost:8800/api/completions/${path}/completion?habbitId=${habbit._id}&currentDate=${currentDate}`);
      console.log(res.data);
      setChecked(res.data?.completed)
      const data = res.data
      // const currentDates = data?.filter( data => data.habit === habbit._id)
      
      
    }
    getChecked()

  }, [path])
  

  const ToggleCheck = (e:ChangeEvent<HTMLInputElement>):void=>{
      e.preventDefault()
      setChecked(e.target.checked)
      console.log(Checked);
      const currentDate = dayjs(new Date()).format('YYYY-MM-DD')
      
      try {
         axios.post(`http://localhost:8800/api/completions/${path}/completion`,
         {
          habbitId:habbit._id,
          completed:!Checked,
          currentDate:currentDate
        })
        
      } catch (error) {
        console.log(error);
      }
  }
  
  return (
    <>
      <div className="items-box">
        <p>{habbit?.name}</p>
        <div className="checkbox-toggle">
            <Checkbox
              checked={Checked}
              onChange={ToggleCheck}
            />
        </div>
       
      </div>
    </>
  );
}

export default HabbitsAdded;
