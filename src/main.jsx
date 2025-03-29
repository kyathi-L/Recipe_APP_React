import 'bootstrap/dist/css/bootstrap.min.css';  // Bootstrap styling
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // For routing
import App from './App'; // Main App component
import './index.css'; // Custom CSS (optional)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>  {/* Wrap the App component with BrowserRouter for routing */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
