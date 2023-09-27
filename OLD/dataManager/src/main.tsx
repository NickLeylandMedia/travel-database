import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { QueryClient, QueryClientProvider } from 'react-query';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import Login from './pages/Login';
import Main from './pages/Main';
import Restaurants from './pages/Restaurants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/restaurants" element={<Restaurants />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
