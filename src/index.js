import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import Header from "./components/Header";
import './index.css';
import Home from './pages/Home';
import Error from './components/Error'
import { GlobalStyles } from './utils/GlobalStyle';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
    <BrowserRouter>
    <GlobalStyles />
        <Header />
        <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/user/:id" element={<Stats />} /> */}
            <Route path="*" element={<Error />} />
        </Routes>
        
    </BrowserRouter>
</React.StrictMode>
);