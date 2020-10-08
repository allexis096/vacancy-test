import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import GlobalStyles from './styles/global';
import { EditContextProvider } from './context/edit';
import Routes from './routes';

const App: React.FC = () => (
  <>
    <BrowserRouter>
      <EditContextProvider>
        <Routes />
      </EditContextProvider>
    </BrowserRouter>

    <GlobalStyles />
  </>
);

export default App;
