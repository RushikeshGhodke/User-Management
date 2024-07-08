import React from 'react';
import './App.css'
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const App = () => {
  return (
    <div>
      <UserForm key={"form"}/>
      <UserList />
    </div>
  );
};

export default App;
