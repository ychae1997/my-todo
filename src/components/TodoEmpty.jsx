import React from 'react';
import styles from '../assets/css/TodoEmpty.module.css';
import TodayEmotion from './TodayEmotion';

export default function TodoEmpty({ today, todo }) {
  return (
    <>
      <div className="todoDateWrap">
        <p className="todoCreatedAt">{today}</p>
        {today && <TodayEmotion todo={todo} />}
      </div>
      <div className={styles.empty}>
        <p className={styles.ment}>
          오늘 할일이 없네요 &#58;&#40;
          <br /> 할 일을 추가해볼까요?
        </p>
      </div>
    </>
  );
}
