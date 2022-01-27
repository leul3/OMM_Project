import React from 'react';
import './App.css';
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return(
    <div className="App">
      <Link to="/mememuc">Go to the meme creator</Link>
    </div>
  )
}

export default App;