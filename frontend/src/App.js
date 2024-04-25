import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './views/Main';
import Admin from './views/Admin';
import Calculator from './views/Calculator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/admin' element={<Admin/>} />
        <Route path='/Calculator/:id' element={<Calculator/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
