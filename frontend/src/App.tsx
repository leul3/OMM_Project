import React from 'react';
import './App.css';
import { Link } from "react-router-dom";

const App: React.FC = () => {
  return(
    <div className="App">
      <ul>
        <li><Link to="/mememuc">Go to the meme creator</Link></li>
        <li><Link to="/memes">See all the memes</Link></li>
      </ul>
    </div>
  )
}

export default App;