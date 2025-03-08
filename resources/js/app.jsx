import './bootstrap';
import React from 'react';
import App from './component/app';
import ReactDom from 'react-dom/client';

const root = ReactDom.createRoot(document.getElementById('app'));
root.render(<App />);


