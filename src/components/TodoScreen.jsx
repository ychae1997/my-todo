import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../assets/css/TodoScreen.module.css';
import { GrNext } from 'react-icons/gr';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import TodoEmpty from './TodoEmpty';
import { useTodoQuery } from '../api/useQuery';
import useInput from '../util/useInput';
import { lockScroll, openScroll } from '../util/useScroll';

export default function TodoScreen({ todos, filter, today, onCheck }) {
  const navigate = useNavigate();
  const { data: incompletes } = useTodoQuery(today, 'incomplete');
  const filtered = getFilteredItems(todos, filter, today);
  const handleCheck = checked => onCheck(checked);

  const [bind, setValue, reset] = useInput('');
  const [showAddInput, setShowAddInput] = useState(false);
  const [mode, setMode] = useState('add');
  const [payload, setPayload] = useState([]);

  const handleEdit = (clicked, itemText) => {
    setMode('edit');
    setShowAddInput(prev => !prev);
    lockScroll(); // scroll 비활성화
    setValue(itemText); // input.value text

    const { id } = clicked.dataset;
    const clickedList = todos.filter(todo =>
      todo.items.some(item => item.id === id)
    )[0];
    setPayload([clickedList, id]);
  };

  const handleModal = modal => {
    if (modal.classList.contains('modal')) {
      setShowAddInput(prev => !prev); // close modal
      openScroll(); // scroll 활성화
      reset(); // input.value reset
    }
  };

  console.log(filtered);
  return (
    <>
      {incompletes && (
        <button
          className={styles.incomplete}
          onClick={() =>
            navigate('/todo/active', {
              state: { incompletes, today }
            })
          }>
          아직 완료하지 못한 할 일이 있어요! 👀
          <GrNext className="arrow" />
        </button>
      )}
      {/* INCOMPLETED TODO */}

      {filtered.length ? (
        <ol>
          {filtered.map(todo => (
            <TodoList
              key={todo.id}
              todo={todo}
              today={today}
              onCheck={handleCheck}
              onEdit={handleEdit}
            />
          ))}
        </ol>
      ) : (
        <TodoEmpty today={today} />
      )}

      {/* TODO LIST */}

      <button
        className="btnAdd"
        onClick={() => {
          setMode('add');
          setShowAddInput(prev => !prev);
          lockScroll();
        }}>
        <BsFillPatchPlusFill />
      </button>
      {showAddInput && (
        <AddTodo
          todos={todos}
          value={bind}
          today={today}
          mode={mode}
          payload={payload}
          onChangeModal={handleModal}
        />
      )}
      {/* INPUT MODAL */}
    </>
  );
}

function getFilteredItems(todos, filter, today) {
  if (filter === 'ALL') return todos;
  return todos.filter(todo => todo.createdAt === today);
}
