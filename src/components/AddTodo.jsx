import { v4 as uuidv4 } from 'uuid';
import styles from '../assets/css/AddTodo.module.css';
import React, { useState } from 'react';
import { IoIosSend } from 'react-icons/io';
import { VscTrash } from 'react-icons/vsc';
import { BsCalendarWeek } from 'react-icons/bs';
import { useUpdatedTodoItem } from '../api/useUpdatedTodoItem';
import { useAddTodoItem } from '../api/useAddTodoItem';

export default function AddTodo({
  todos,
  value,
  today,
  mode,
  payload,
  onChangeModal
}) {
  const handleModal = e => onChangeModal(e.target); // ~ closed modal

  const { mutate: postItem } = useAddTodoItem();
  const { mutate: patchItem } = useUpdatedTodoItem();
  const addTodo = () => {
    let body = {};
    const items = [
      {
        id: uuidv4(),
        text: value.value,
        status: 'active'
      }
    ];
    const todayTodo = todos.filter(todo => todo.createdAt === today);
    // 오늘 할 일이 1개라도 있을 떄 - patch
    if (todayTodo.length) {
      body = {
        items: [...todayTodo[0].items, ...items]
      };
      patchItem([todayTodo[0].id, body]);
      // console.log([todayTodo[0].id, body]);
    } else {
      //오늘 할 일이 하나도 없을 때 - post
      body = {
        createdAt: today,
        items
      };
      postItem(body);
    }
  };
  // add button - add todo

  const editTodo = () => {
    const [clickedList, id] = payload;
    const updateditems = clickedList.items.map(item => {
      if (item.id === id) {
        return { ...item, text: value.value };
      } else {
        return item;
      }
    });
    patchItem([clickedList.id, { items: updateditems }]);
  };

  const handleSubmit = e => {
    e.preventDefault();
    mode === 'add' && addTodo();
    mode === 'edit' && editTodo();
  };
  // submit

  const deleteTodo = () => {
    const [clickedList, id] = payload;
    const deleteItems = clickedList.items.filter(item => item.id !== id);
    patchItem([clickedList.id, { items: deleteItems }]);
  };

  return (
    <div onClick={handleModal} className={`modal ${styles.bg}`}>
      <div className={styles.wrap}>
        {mode === 'edit' && (
          <button onClick={deleteTodo} className={styles.del}>
            <VscTrash />
          </button>
        )}
        <form className={styles.form} onSubmit={handleSubmit}>
          <input className={styles.input} {...value} type="text" />
          <div className={styles.btnBox}>
            <button className={styles.btnDate}>
              <BsCalendarWeek className={styles.icon} />
              <span className={styles.date}>오늘</span>
            </button>
            <button className={styles.send}>
              <IoIosSend />
            </button>
          </div>
          {/* <button handleEdit={handleEdit}>edit</button> */}
        </form>
      </div>
    </div>
  );
}
