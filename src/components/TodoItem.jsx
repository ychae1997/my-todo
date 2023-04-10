import React from 'react';
import styles from '../assets/css/TodoItem.module.css';

export default function TodoItem({ item, onCheck, onEdit }) {
  const { id, text, status } = item;

  const handleCheck = e => e.target.tagName === 'INPUT' && onCheck(e.target);
  // todo chk target
  const handleEdit = e => onEdit(e.target, e.target.innerText);
  // todo text target

  return (
    <li className={styles.todo}>
      <input
        type="checkbox"
        id={id}
        className={styles.chk}
        checked={status === 'done'}
        onChange={handleCheck}
      />
      <label className={styles.label} htmlFor={id} onClick={handleCheck}>
        <span className={styles.customChk}></span>
      </label>
      <p className={styles.text} data-id={id} onClick={handleEdit}>
        {text}
      </p>
    </li>
  );
}
