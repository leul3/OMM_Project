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

ReactDOM.render(
    <BrowserRouter>
        <div className="App">
            <header>
                <h1>MemeMUC</h1>
            </header>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="mememuc" element={<OmmMememuc />} />
                <Route path="memes" element={<Memes />} />
            </Routes>
        </div>
    </BrowserRouter>, 
    document.getElementById('root')
);