import React, { useState } from 'react';
import styles from '../assets/css/EmotionModal.module.css';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { GrClose } from 'react-icons/gr';
import { lockScroll, openScroll } from '../util/useScroll';

export default function EmotionModal({ handleModal, status, chooseEmoji }) {
  const emotions = [
    'happy',
    'surprise',
    'madness',
    'joy',
    'gloomy',
    'good',
    'anger',
    'sadness'
  ];
  const handleEmoji = e => chooseEmoji(e);
  lockScroll();
  const closeModal = () => {
    // close modal
    handleModal(prev => !prev);
    openScroll();
  };

  return (
    <div className={styles.modalWrap}>
      <div className={styles.modal}>
        <p className={styles.text}>오늘 하루 어땠나요?</p>
        <ul className={styles.emotions}>
          {emotions.map(e => (
            <li
              key={e}
              onClick={() => handleEmoji(e)}
              className={styles.emotion}>
              <img
                className={styles.img}
                src={`${process.env.PUBLIC_URL}/images/${e}.png`}
              />
            </li>
          ))}
        </ul>
        <div className={styles.nextWrap}>
          {status && (
            <div className={styles.imgWrap}>
              <img
                className={styles.currentImg}
                src={`${process.env.PUBLIC_URL}/images/${status}.png`}
              />
            </div>
          )}
          <button
            onClick={closeModal}
            className={styles.next}
            disabled={!status}>
            <AiOutlineArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
