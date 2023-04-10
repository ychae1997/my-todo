import React, { createContext, useContext } from 'react';
import GetData from '../api/getData';
// import FakeClient from '../api/FakeClient';
import DataClient from '../api/dataClient';

export const TodoApiContext = createContext();

// create instance
// const client = new FakeClient();
const client = new DataClient();
const getData = new GetData(client);

export function TodoApiProvider({ children }) {
  return (
    <TodoApiContext.Provider value={{ getData }}>
      {children}
    </TodoApiContext.Provider>
  );
}

export function useTodoApi() {
  return useContext(TodoApiContext);
}
