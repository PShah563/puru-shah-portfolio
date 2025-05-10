import React from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import Projects from './components/Projects';
// import Footer from './components/Footer';
import './App.css';
import './fonts/fonts.css';

function App() {
  return (
    <>
      <Navbar />
      <Landing />
      <Projects />
    </>
  );
}

export default App;
