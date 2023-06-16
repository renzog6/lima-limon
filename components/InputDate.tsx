//@/app/components/InputDate.tsx
"use client";

import { useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDate = ({ date, onChange }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChange = (date) => {
    setStartDate(date);
    onChange(date); // Llama a la función onChange pasando el nuevo valor de la fecha
  };

  return (
    <>
      <DatePicker
        selected={date}
        onChange={handleDateChange}
        showIcon
        dateFormat="dd/MM/yyyy"
      />
    </>
  );
};

export default InputDate;
