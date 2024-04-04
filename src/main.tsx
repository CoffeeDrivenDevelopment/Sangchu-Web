import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { NavermapsProvider } from 'react-naver-maps';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './assets/styles/font/font.css';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <NavermapsProvider ncpClientId={import.meta.env.VITE_NAVERMAPS_CLIENT_ID}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </NavermapsProvider>
  </QueryClientProvider>,
);
