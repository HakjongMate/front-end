import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <App />
      <Footer />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();