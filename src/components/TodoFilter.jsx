import React from 'react';
import styles from '../assets/css/TodoFilter.module.css';

export default function TodoFilter({ filters, filter, handleFilter }) {
  return (
    <ul className={styles.filters}>
      {filters.map((el, i) => (
        <li key={i}>
          <button
            onClick={() => handleFilter(el)}
            className={`${styles.filter} ${filter === el && styles.active}`}>
            {el}
          </button>
        </li>
      ))}
    </ul>
  );
}
