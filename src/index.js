import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { AppProvider } from './context/AppContext';
import './index.css';

// Using createElement instead of JSX syntax to avoid parsing issues
ReactDOM.createRoot(document.getElementById('root')).render(
  React.createElement(
    React.StrictMode,
    null,
    React.createElement(
      AppProvider,
      null,
      React.createElement(App, null)
    )
  )
);