// src/App.js
import React from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  return (
    <div>
      <UserForm />
      <UserList />
    </div>
  );
};

export default App;
