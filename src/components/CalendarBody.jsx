import React from 'react';
import styles from '../assets/css/CalendarBody.module.css';
import { format, isSameDay } from 'date-fns';
import { getDays } from '../util/getDays';
import { useTodoQuery } from '../api/useQuery';
import { useNavigate } from 'react-router-dom';

export default function CalendarBody({ currentMonth, selectedDate }) {
  const navigate = useNavigate();
  const rows = getDays(currentMonth);
  const today = format(currentMonth, 'yyyy.M.d');
  const { data: diary } = useTodoQuery(today, 'diary');

  return (
    <ul className={styles.cells}>
      {rows.map(row =>
        row.map(day => {
          // console.log(day);
          return (
            <li className={styles.cell} key={day}>
              {diary &&
                diary.map(
                  item =>
                    item.createdAt === format(day, 'yyyy.M.d') && (
                      <button
                        key={item.id}
                        className={styles.btnDiary}
                        onClick={() =>
                          navigate(`/diary/${item.id}`, { state: item })
                        }>
                        <img
                          className={styles.status}
                          src={`${process.env.PUBLIC_URL}/images/${item.status}.png`}
                        />
                      </button>
                    )
                )}
              <button
                onClick={() => navigate('/diary/create', { state: day })}
                disabled={new Date() < day && true}
                className={`${styles.date} ${
                  isSameDay(day, selectedDate)
                    ? styles.selected
                    : format(currentMonth, 'M') !== format(day, 'M') &&
                      styles.hidden
                }`}>
                {format(day, 'd')}
              </button>
            </li>
          );
        })
      )}
    </ul>
  );
}
