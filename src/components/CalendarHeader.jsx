import React, { useState } from 'react';
import styles from '../assets/css/CalendarHeader.module.css';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
import { format, subYears, addYears, setMonth } from 'date-fns';
import { lockScroll, openScroll } from '../util/useScroll';

export default function CalendarHeader({
  currentMonth,
  setCurrentMonth,
  goToday
}) {
  const [modal, setModal] = useState(false);
  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const year = format(currentMonth, 'yyyy');
  const month = format(currentMonth, 'M');

  const openModal = () => {
    // open modal
    setModal(prev => !prev);
    lockScroll();
  };
  const closeModal = e => {
    // close modal
    if (e.target.classList.contains('close')) {
      setModal(prev => !prev);
      openScroll();
    }
  };
  const handleYear = button => {
    button === 'prev' && setCurrentMonth(prev => subYears(prev, 1));
    button === 'next' && setCurrentMonth(prev => addYears(prev, 1));
  };
  const handleMonth = e => {
    setCurrentMonth(prev => setMonth(prev, e.target.value - 1));
    // close modal
    setModal(prev => !prev);
    openScroll();
  };

  return (
    <>
      <div className={styles.header}>
        <ul className={styles.headerList} onClick={openModal}>
          <li className={styles.headerYear}>{year}</li>
          <li className={styles.headerMonth}>{month}월</li>
        </ul>
      </div>
      {modal && (
        <div onClick={closeModal} className={`close ${styles.modalWrap}`}>
          <div className={styles.modal}>
            <div className={styles.controller}>
              <button
                className={styles.control}
                onClick={() => handleYear('prev')}>
                <GrFormPrevious />
              </button>
              <p onClick={() => goToday()} className={styles.modalYear}>
                {year}
              </p>
              <button
                className={styles.control}
                onClick={() => handleYear('next')}>
                <GrFormNext />
              </button>
            </div>
            <div className={styles.months}>
              {monthArr.map((el, i) => (
                <button
                  className={`${el === Number(month) ? styles.selected : ''} ${
                    styles.btnMonth
                  }`}
                  key={i}
                  value={el}
                  onClick={handleMonth}>
                  {el}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
