import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calendar.css';

const Calendar = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    props.setDate(date);
  };

  return (
      <DatePicker
        id="future-date-picker"
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd MMMM yyyy"
        minDate={new Date()} // Prevents selection of past dates
        placeholderText="Select date"
        className="custom-calendar-input"
        // showMonthDropdown // Dropdown for months
        // showYearDropdown  // Dropdown for years
        dropdownMode="select" // Allows user to select from dropdown
      />
  );
};

export default Calendar;
