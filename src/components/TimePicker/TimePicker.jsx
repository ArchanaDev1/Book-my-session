import React, { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import "./timepicker.css";

const TimePicker = (props) => {
  const [selectedTime, setSelectedTime] = useState({
    hour: '02',
    minute: '00',
    period: 'PM',
  });

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setSelectedTime({
      ...selectedTime,
      [name]: value.toString().padStart(2, '0'), 
    });
  };

useEffect(()=>{
  props.setTime(selectedTime);
},[selectedTime])

  return (
    <div className="time-picker">
      <input
        type="number"
        name="hour"
        value={selectedTime.hour}
        onChange={handleTimeChange}
        min="01"
        max="12"
        className="time-input"
      />
      <span>:</span>
      <input
        type="number"
        name="minute"
        value={selectedTime.minute}
        onChange={handleTimeChange}
        min="00"
        max="59"
        className="time-input"
      />
      <select
        name="period"
        value={selectedTime.period}
        onChange={handleTimeChange}
        className="time-input period-select"
      >
        <option value="AM">AM</option>
        <option value="PM">PM</option>
      </select>
      <FaRegClock className="clock-icon" />
    </div>
  );
};

export default TimePicker;
