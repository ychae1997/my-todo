import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Todo from './pages/Todo';
import NotFound from './pages/NotFound';
import TodoActive from './pages/TodoActive';
import Diary from './pages/Diary';
import DiaryDetail from './pages/DiaryDetail';
import DiaryCreate from './pages/DiaryCreate';
import DiaryList from './pages/DiaryList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Todo />
      },
      {
        path: 'todo',
        element: <Todo />
      },
      {
        path: 'todo/active',
        element: <TodoActive />
      },
      {
        path: 'diary',
        element: <Diary />
      },
      {
        path: 'diary/:date',
        element: <DiaryDetail />
      },
      {
        path: 'diary/create/:date',
        element: <DiaryCreate />
      },
      {
        path: 'diary/list',
        element: <DiaryList />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
