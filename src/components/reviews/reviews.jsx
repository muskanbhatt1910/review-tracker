import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const FromDate = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            isClearable
            placeholderText="I have been cleared!"
        />
    );
};

const ToDate = () => {
    const [endDate, setEndDate] = useState(new Date());
    return (
        <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            isClearable
            placeholderText="I have been cleared!"
        />
    );
       
};

const DateFilter = () => {
    return (
        <div>
            <FromDate />
            <ToDate />
        </div>
    )
};

export default DateFilter


