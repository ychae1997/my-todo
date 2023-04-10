import React from 'react';
import styles from '../assets/css/TodoActive.module.css';
import { useLocation } from 'react-router-dom';
import TodoList from '../components/TodoList';

export default function TodoActive() {
  const {
    state: { today, incompletes }
  } = useLocation();

  return (
    <main className={styles.container}>
      <p className={styles.title}>
        아직 완료하지 못한 할 일이 있네요! <br /> 힘내서 얼른 끝내봐요
      </p>
      {incompletes.map(item => (
        <TodoList key={item.id} todo={item} today={today}></TodoList>
      ))}
    </main>
  );
}
