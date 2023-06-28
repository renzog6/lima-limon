//@/app/components/InputDate.tsx
"use client";

import { useState } from "react";

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from "date-fns/locale/es";

const InputDate = ({ date, onChange }) => {
  registerLocale("es", es);
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
        dateFormat="dd/MM/yyyy"
        locale="es"
        className="h-8 w-44 bg-transparent border-none items-center"
      />
    </>
  );
};

export default InputDate;
