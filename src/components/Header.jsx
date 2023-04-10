import React, { useState } from 'react';
import styles from '../assets/css/Header.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import { FiSearch, FiMoreVertical, FiSettings } from 'react-icons/fi';
import { GrPrevious } from 'react-icons/gr';
import { useDarkMode } from '../context/DarkModeContext';
import { lockScroll, openScroll } from '../util/useScroll';
import { useDelete } from '../api/useDeleteItem';

export default function Header({ header }) {
  const navigate = useNavigate();
  const menu = ['todo', 'diary'];
  const title = header === '/' ? 'todo' : header.slice(1);
  const [dropDown, setDropDown] = useState(false);
  const [more, setMore] = useState(false);
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { pathname } = useLocation();
  const { state } = useLocation();

  // console.log(state);
  // /diary/detail => {item}
  // /diary/create => 해당 날짜
  // /todo/active => incompletes: {}
  const handleEdit = () => {
    const goDiaryEdit = `/diary/${state.id}`;
    pathname === goDiaryEdit && navigate(`diary/edit/${state.id}`, { state });
  };
  const { mutate: deleteItem } = useDelete();
  const handleDelete = () => {
    const goDiaryDelete = `/diary/${state.id}`;
    if (pathname === goDiaryDelete) {
      deleteItem(state.id);
      navigate('/diary');
    }
  };

  return (
    <header className={styles.header}>
      {pathname === '/' || pathname === '/todo' || pathname === '/diary' ? (
        <>
          <div className={styles.titleGroup}>
            <h1
              onClick={() => setDropDown(prev => !prev)}
              className={styles.title}>
              {title}
              {dropDown ? <MdArrowDropUp /> : <MdArrowDropDown />}
            </h1>
            {dropDown && (
              <ul className={` headerMenu ${styles.menu}`}>
                {menu.map(el => (
                  <li
                    key={el}
                    className={title === el ? styles.active : ''}
                    onClick={() => {
                      navigate(`/${el}`);
                      setDropDown(prev => !prev);
                    }}>
                    {el}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className={styles.btnGroup}>
            <button onClick={toggleDarkMode}>
              {darkMode ? 'Light' : 'Dark'}
              {/* <FiMoreVertical /> */}
            </button>
          </div>
        </>
      ) : (
        <div className={styles.back}>
          <button onClick={() => navigate(-1)}>
            <GrPrevious />
          </button>
          <button
            onClick={() => {
              setMore(prev => !prev);
              lockScroll();
            }}>
            <FiMoreVertical />
          </button>
          {more && (
            <div
              className={`close ${styles.moreBg}`}
              onClick={e => {
                // if (e.target.classList.contains('close')) {
                setMore(prev => !prev);
                openScroll();
                // }
              }}>
              <ul className={styles.more}>
                <li>
                  <button onClick={handleEdit} className={styles.edit}>
                    수정
                  </button>
                </li>
                <li>
                  <button onClick={handleDelete} className={styles.del}>
                    삭제
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
