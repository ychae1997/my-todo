import React, { useState } from 'react';
import styles from '../assets/css/Calendar.module.css';
import CalendarHeader from './CalendarHeader';
import CalendarDays from './CalendarDays';
import CalendarBody from './CalendarBody';
import { getMonth, getYear } from 'date-fns';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { GrFormNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const goToday = () => setCurrentMonth(new Date());
  const navigate = useNavigate();

  return (
    <>
      <button
        className={styles.btnLink}
        onClick={() => navigate('/diary/list')}>
        LIST
        <GrFormNext className={styles.formNext} />
      </button>
      <article className={styles.calendar}>
        <CalendarHeader
          currentMonth={currentMonth}
          setCurrentMonth={setCurrentMonth}
          selectedDate={selectedDate}
          goToday={goToday}
        />
        <CalendarDays />
        <CalendarBody currentMonth={currentMonth} selectedDate={selectedDate} />
        {/* Calendar */}
      </article>
      {(getYear(new Date()) !== getYear(currentMonth) ||
        getMonth(new Date()) !== getMonth(currentMonth)) && (
        <button className={styles.btnToday} onClick={goToday}>
          Today
        </button>
      )}
      <button
        className="btnAdd"
        onClick={() => navigate('/diary/create', { state: currentMonth })}>
        <BsFillPatchPlusFill />
      </button>
      {/* Buttons */}
    </>
  );
}
