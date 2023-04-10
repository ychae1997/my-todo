import styles from '../assets/css/DiaryList.module.css';
import { format } from 'date-fns';
import React from 'react';
import { useTodoQuery } from '../api/useQuery';
import { useNavigate } from 'react-router-dom';

export default function DiaryList() {
  const navigate = useNavigate();
  const today = format(new Date(), 'yyyy.M.d');
  const { data: diary } = useTodoQuery(today, 'diary');

  return (
    <main className={styles.container}>
      {diary &&
        diary.map(diary => (
          <article
            key={diary.id}
            className={styles.content}
            onClick={() => navigate(`/diary/${diary.id}`, { state: diary })}>
            <div className={styles.info}>
              <span className={styles.img}>
                <img
                  className={styles.status}
                  src={`${process.env.PUBLIC_URL}/images/${diary.status}.png`}
                />
              </span>
              <p className={styles.date}>
                {diary.createdAt}
                <span className={styles.day}>
                  {
                    ['일', '월', '화', '수', '목', '금', '토'][
                      diary && new Date(diary.createdAt).getDay()
                    ]
                  }
                  요일
                </span>
              </p>
            </div>
            <div className={styles.text}>{diary.text}</div>
          </article>
        ))}
    </main>
  );
}
