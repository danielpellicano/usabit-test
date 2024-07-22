import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientsPage from './pages/ClientsPage';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ClientsPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
