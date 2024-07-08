// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import '../App.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, deleteUser, updateUser } from '../features/userSlice';
import { v4 as uuidv4 } from 'uuid';


const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const userStatus = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    if (userStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [userStatus, dispatch]);

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleEdit = (user) => {
    setEditUserId(user.id);
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleSave = () => {
    dispatch(updateUser({
      id: editUserId,
      name: editFormData.name,
      email: editFormData.email,
      phone: editFormData.phone,
    })).then(() => {
      setEditUserId(null);
    });
  };

  const handleCancel = () => {
    setEditUserId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  let content;

  if (userStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (userStatus === 'succeeded') {
    content = (
      <ul>
        {users.map(user => (
          <li key={uuidv4()}>
            {editUserId === user.id ? (
              <>
                <input
                  type="text"
                  name="name"
                  value={editFormData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  value={editFormData.email}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="phone"
                  value={editFormData.phone}
                  onChange={handleInputChange}
                />
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </>
            ) : (
              <>
                {user.name} - {user.email} - {user.phone}
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </>
            )}
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
