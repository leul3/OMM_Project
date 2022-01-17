import React from 'react';
import './App.css';
import OmmMememuc from './components/mememuc'

const App: React.FC = () => {
  return (
    <div className="App">
      <header>
        <h1>MemeMUC</h1>
      </header>
      <OmmMememuc />
    </div>
  );
}

export default App;