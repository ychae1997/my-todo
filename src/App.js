import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import './assets/css/App.css';
import Header from './components/Header';
import { DarkModeProvider } from './context/DarkModeContext';
import { TodoApiProvider } from './context/TodoApiContext';
import Splash from './pages/Splash';

const queryClient = new QueryClient();

function App() {
  const { pathname } = useLocation();
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      localStorage.splash = 'false';
      setSplash(false);
    }, 5000);
  }, [localStorage.splash]);

  return (
    <div className="wrap">
      <DarkModeProvider>
        {/* {splash && <Splash />} */}
        <TodoApiProvider>
          <QueryClientProvider client={queryClient}>
            <Header header={pathname} />
            <Outlet />
          </QueryClientProvider>
        </TodoApiProvider>
      </DarkModeProvider>
    </div>
  );
}

export default App;
