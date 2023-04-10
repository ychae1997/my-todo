import React from 'react';
import styles from '../assets/css/DiaryDetail.module.css';
import { useLocation } from 'react-router-dom';

export default function DiaryDetail() {
  const { state: diary } = useLocation();
  const day = ['일', '월', '화', '수', '목', '금', '토'][
    diary && new Date(diary.createdAt).getDay()
  ];

  return (
    diary && (
      <main className={styles.main}>
        <div className={styles.header}>
          <img
            className={styles.status}
            src={`${process.env.PUBLIC_URL}/images/${diary.status}.png`}
          />
          <p className={styles.date}>
            {diary.createdAt}
            <span className={styles.day}>{day}요일</span>
          </p>
        </div>
        <pre className={styles.text}>{diary.text}</pre>
      </main>
    )
  );
}
