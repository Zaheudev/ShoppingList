import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ShoppingListProvider } from './context/ShoppingListContext';
import './index.css';

ReactDOM.render(
  <AuthProvider>
    <ShoppingListProvider>
      <App />
    </ShoppingListProvider>
  </AuthProvider>,
  document.getElementById('root')
);