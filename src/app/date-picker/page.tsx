"use client";
import DateTimePicker from "@/components/date-picker/DateTimePicker";
import { useState } from "react";

const DatePickerPage = () => {
  const [time, setTime] = useState("");
  return (
    <div>
      <DateTimePicker time={time} setTime={setTime} />
    </div>
  );
};

export default DatePickerPage;
