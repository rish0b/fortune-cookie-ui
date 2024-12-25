import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Landing from './pages/Landing/Landing';

import './App.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App
