import React, { FormEvent, useState } from "react";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

type habbit = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  path: string;
};

interface HabitFormValues {
  habitName: string;
  startDate: Date | null;
  endDate: Date | null;
  reminderTime?: Date | null;
}

function AddHabbit({ setShowModal, path }: habbit) {
  const [formValues, setFormValues] = useState<HabitFormValues>({
    habitName: "",
    startDate: null,
    endDate: null,
    reminderTime: null,
  });

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    try {

      const formattedStartDate = dayjs(formValues.startDate!).format('YYYY-MM-DD');
      const formattedEndDate = dayjs(formValues.endDate!).format('YYYY-MM-DD');
      const formattedReminderTime = dayjs(formValues.reminderTime!).format('HH:mm');

      const difference = dayjs(formattedEndDate).diff(dayjs(formattedStartDate),"day")
      console.log(difference);
      
     console.log(formattedEndDate,formattedStartDate,formattedReminderTime,formValues.habitName);
     
      const response = await axios.post("http://localhost:8800/api/habbit/" + path, {
        name: formValues.habitName,
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        reminderTime: formattedReminderTime,
      });

      setFormValues({
        habitName: '',
        startDate: null,
        endDate: null,
        reminderTime: null,
      });

      console.log(response);
      setTimeout(() => {
        setShowModal(false);
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const isFormValid = formValues.habitName !== '' && formValues.startDate !== null && formValues.endDate !== null && formValues.reminderTime !== null;


  return (
    <div className="register-login">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form action="" className="form-Add">
          <TextField
            value={formValues.habitName}
            onChange={(e) =>
              setFormValues((prev) => ({ ...prev, habitName: e.target.value }))
            }
            id="outlined-multiline-flexible"
            fullWidth
            label="Multiline"
            multiline
            maxRows={4}
          />

          <div className="picker">
            <DatePicker
              label="Start Date"
              value={formValues.startDate}
              onChange={(date: Date | null) =>
                setFormValues((prevDate) => ({ ...prevDate, startDate:date }))
              }
            />
            <DatePicker
              label="Start Date"
              value={formValues.endDate}
              onChange={(date: Date | null) =>
                setFormValues((prevDate) => ({ ...prevDate, endDate:date }))
              }
            />
          </div>
          <TimePicker
            label="Your Habbit Time"
            value={formValues.reminderTime}
            onChange={(time: Date | null) =>
              setFormValues((prevTime) => ({ ...prevTime, reminderTime:time }))
          }
          />
          <button
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
            disabled={!isFormValid}
          >
            Create A Habbit
          </button>
        </form>
      </LocalizationProvider>
    </div>
  );
}

export default AddHabbit;
