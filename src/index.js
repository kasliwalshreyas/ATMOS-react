import ReactDOM from 'react-dom/client';
import React from 'react';
import './project-task.css';
import './project.css';
import './common.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChatProvider } from './pages/Messages/Components/context/ChatContext';
import { ChatsProvider } from './pages/Messages/Components/context/ChatsContext';
import { store } from './store';
import { Provider } from 'react-redux';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <ChatProvider>
      <ChatsProvider>
      <App />
      </ChatsProvider>
    </ChatProvider>
  </Provider>
  // </React.StrictMode>
);
