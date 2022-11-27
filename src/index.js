import ReactDOM from 'react-dom/client';
import React from 'react';
import './project-task.css';
import './project.css';
import './common.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChatProvider } from './pages/Messages/Components/context/ChatContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ChatProvider>
    <App />
  </ChatProvider>
  // </React.StrictMode>
);
