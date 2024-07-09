import React, { useState } from 'react';
import '../App.css'
import { useDispatch } from 'react-redux';
import { addUser } from '../features/userSlice';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    let formErrors = {};
    if (name.trim() === '') {
      formErrors.name = 'Name is required';
    }
    if (email.trim() === '') {
      formErrors.email = 'Email is required';
    }
    if (phone.trim() === '') {
      formErrors.phone = 'Phone is required';
    } else if (!/^[789]\d{9}$/.test(phone) || phone.length !== 10) {
      formErrors.phone = 'Invalid phone number';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const newUser = {
      name,
      email,
      phone,
    };
    dispatch(addUser(newUser));
    setName('');
    setEmail('');
    setPhone('');
    setErrors({});
  };

  return (
    <>
      <center><h1 className='title'>User Management</h1></center>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        {errors.name && <span className="error">{errors.name}</span>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoFocus
        />
        {errors.email && <span className="error">{errors.email}</span>}
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
        <button className="submit" type="submit">Submit</button>
      </form>
    </>
  );
};

export default UserForm;
