//DO import react and other needed dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { ThemeWrapper } from "./context/theme.context"

//DO import other needed pages
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//DO render ReactDOM
ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeWrapper>
        <App />
      </ThemeWrapper>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
