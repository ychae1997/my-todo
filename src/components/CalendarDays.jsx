import React from 'react';
import styles from '../assets/css/CalendarDays.module.css';

export default function CalendarDays() {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  return (
    <ul className={styles.days}>
      {days.map((day, i) => (
        <li className={styles.day} key={i}>
          {day}
        </li>
      ))}
    </ul>
  );
}
