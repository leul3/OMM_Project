import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import OmmMememuc from './components/mememuc'
import Memes from "./components/memes";
import Login from './components/login';

ReactDOM.render(
    <BrowserRouter>
        <div className="App">
            <header>
                <h1>MemeMUC</h1>
            </header>
            <Routes>
                {/* Add login route on app start */}
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<App />} />
                <Route path="mememuc" element={<OmmMememuc />} />
                <Route path="memes" element={<Memes />} />
            </Routes>
        </div>
    </BrowserRouter>, 
    document.getElementById('root')
);