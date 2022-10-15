import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Signup from './components/Signup';
import Home from'./components/Home.js';
import Login from './components/Login';
import Logout from './components/Logout';
import List from './components/Lists';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path = '/' element = {<App />} >
        <Route path = '' element = {<Home />}/>
        <Route path = 'signup' element = {<Signup />}/>
        <Route path = 'login' element = {<Login />} />
        <Route path = 'logout' element = {<Logout />} />
        <Route path = 'list' element = {<List />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
