// src/components/UserList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser } from '../features/userSlice';
import { v4 as uuidv4 } from 'uuid';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const userStatus = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  let content;

  if (userStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (userStatus === 'succeeded') {
    content = (
      <ul >
        {users.map(user => (
          <li key={uuidv4()}>
            {user.name} - {user.email} - {user.phone}
            <button onClick={() => handleDelete(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  } else if (userStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h1>User List</h1>
      {content}
    </div>
  );
};

export default UserList;
