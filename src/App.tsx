import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GlobalStyles from './styles/global';
import { EditContextProvider } from './context/edit';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <EditContextProvider>
        <Routes />
        <ToastContainer />
      </EditContextProvider>
    </BrowserRouter>

    <GlobalStyles />
  </>
);

export default App;
