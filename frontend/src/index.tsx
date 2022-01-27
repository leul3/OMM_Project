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
import Meme from "./components/Meme";

ReactDOM.render(
    <BrowserRouter>
        <div className="App">
            <header>
                <h1>MemeMUC</h1>
            </header>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="mememuc" element={<OmmMememuc />} />
                <Route path="meme" element={<Meme />}>
                    <Route path=":memeId" element={<Meme />} />
                </Route>
            </Routes>
        </div>
    </BrowserRouter>, 
    document.getElementById('root')
);