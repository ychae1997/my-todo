import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../assets/css/DiaryCreate.module.css';
import EmotionModal from '../components/EmotionModal';
import { BsImage, BsClock, BsSendFill } from 'react-icons/bs';
import useInput from '../util/useInput';
import { useAddDiaryItem } from '../api/useAddDirayItem';
import { useEditedDiary } from '../api/useEditedDiary';

export default function DiaryCreate({ mode }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [modal, setModal] = useState(mode ? false : true);
  const [bind, setValue, reset] = useInput(mode ? state.text : '');
  const [status, setStatus] = useState(mode ? state.status : 'default');
  const createdAt = mode ? state.createdAt : format(state, 'yyyy.M.d');
  const day = ['일', '월', '화', '수', '목', '금', '토'][
    new Date(createdAt).getDay()
  ];

  const { mutate: postItem } = useAddDiaryItem();
  const { mutate: putItem } = useEditedDiary();
  const body = {
    createdAt,
    text: bind.value,
    status
  };

  const currentTime = () => {
    const now = format(new Date(), 'HH시mm분') + '\n';
    setValue(now + bind.value);
  };

  const handleEmoji = emotion => setStatus(emotion);
  const handleSubmit = e => {
    e.preventDefault();
    !mode && postItem(body);
    mode && putItem([state.id, body]);
    navigate('/diary');
  };

  return (
    <main>
      {modal && (
        <EmotionModal
          handleModal={setModal}
          status={status}
          chooseEmoji={handleEmoji}
        />
      )}
      <div className={styles.header}>
        {status && (
          <button
            className={styles.statusBtn}
            onClick={() => setModal(prev => !prev)}>
            <img
              className={styles.status}
              src={`${process.env.PUBLIC_URL}/images/${status}.png`}
            />
          </button>
        )}
        <p className={styles.date}>
          {createdAt}
          <span className={styles.day}>{day}요일</span>
        </p>
      </div>
      <div className={styles.body}>
        <textarea required className={styles.textArea} {...bind}></textarea>
        <div className={styles.buttonWrap}>
          <button disabled>
            <BsImage />
          </button>
          <button onClick={currentTime}>
            <BsClock />
          </button>
          <button
            onClick={handleSubmit}
            type="submit"
            className={styles.submit}>
            <BsSendFill />
          </button>
        </div>
      </div>
    </main>
  );
}
