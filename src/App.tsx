import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './Components/header'
import Filter from './Components/filter';

function App() {
  return (
    <div className='container'>
      <Header />
      <Filter/>
    </div>
  );
}

export default App;
