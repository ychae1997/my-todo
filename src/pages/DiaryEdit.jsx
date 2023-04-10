import React from 'react';
import { useLocation } from 'react-router-dom';
import DiaryCreate from './DiaryCreate';

export default function DiaryEdit() {
  const { state: diary } = useLocation();
  // console.log(diary);
  return (
    <>
      <DiaryCreate mode="edit" />
    </>
  );
}
