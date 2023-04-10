import React from 'react';
import styles from '../assets/css/TodoList.module.css';
import TodayEmotion from './TodayEmotion';
import TodoItem from './TodoItem';

export default function TodoList({ todo, today, onCheck, onEdit }) {
  const handleCheck = checked => onCheck && onCheck(checked);
  const handleEdit = (clicked, text) => onEdit && onEdit(clicked, text);

  return (
    <li className={styles.todoBox} key={todo.createdAt}>
      {today !== todo.createdAt && todo.items.length === 0 ? (
        <></>
      ) : (
        <div className="todoDateWrap">
          <p className="todoCreatedAt">{todo.createdAt}</p>
          {today === todo.createdAt && <TodayEmotion todo={todo} />}
        </div>
      )}

      <ul>
        {todo.items.map(el => (
          <TodoItem
            key={el.id}
            item={el}
            onEdit={handleEdit}
            onCheck={handleCheck}></TodoItem>
        ))}
      </ul>
    </li>
  );
}
