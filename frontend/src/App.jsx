<<<<<<< HEAD
// src/App.js
import React from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
=======
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [inputarr, setInputarr] = useState([]);
  const [inputdata, setInputdata] = useState({
    name: "",
    email: "",
    phoneno: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    phoneno: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("inputarr");
    if (savedData) {
      setInputarr(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever inputarr changes
  useEffect(() => {
    localStorage.setItem("inputarr", JSON.stringify(inputarr));
  }, [inputarr]);

  // Handle input changes
  function handleChange(e) {
    setInputdata({ ...inputdata, [e.target.name]: e.target.value });
  }

  // Validate the email format
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Validate the phone number format
  function validatePhoneNumber(phoneno) {
    const regex = /^\d{10}$/;
    return regex.test(phoneno);
  }

  // Handle form submission
  function handleSubmit() {
    const { email, phoneno } = inputdata;
    let valid = true;
    let emailError = "";
    let phonenoError = "";

    // Validate email
    if (!validateEmail(email)) {
      emailError = "Invalid email format.";
      valid = false;
    }

    // Validate phone number
    if (!validatePhoneNumber(phoneno)) {
      phonenoError = "Phone number must be 10 digits.";
      valid = false;
    }

    setErrors({
      email: emailError,
      phoneno: phonenoError,
    });

    if (valid) {
      if (isEditing) {
        // Update the existing record
        const updatedArr = inputarr.map((item, index) =>
          index === currentIndex ? inputdata : item
        );
        setInputarr(updatedArr);
        setIsEditing(false);
        setCurrentIndex(null);
      } else {
        // Add a new record
        setInputarr([...inputarr, inputdata]);
      }
      setInputdata({ name: "", email: "", phoneno: "" }); // Clear the form after submission
      setErrors({ email: "", phoneno: "" }); // Clear errors after successful submission
    }
  }

  // Handle edit
  function handleEdit(index) {
    const itemToEdit = inputarr[index];
    setInputdata(itemToEdit);
    setIsEditing(true);
    setCurrentIndex(index);
  }

  // Handle delete
  function handleDelete(index) {
    const filteredArr = inputarr.filter((_, i) => i !== index);
    setInputarr(filteredArr);
  }
>>>>>>> ffd3e848e394ab9abb5b469b71a669ea292a4057

  return (
<<<<<<< HEAD
    <div>
      <UserForm />
      <UserList />
    </div>
  );
};
=======
    <div className="App">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={inputdata.name}
          onChange={handleChange}
          placeholder="Enter Name"
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={inputdata.email}
          onChange={handleChange}
          placeholder="Enter Email"
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <div>
        <label htmlFor="phoneno">Phone Number:</label>
        <input
          type="text"
          id="phoneno"
          name="phoneno"
          value={inputdata.phoneno}
          onChange={handleChange}
          placeholder="Enter Phone No."
        />
        {errors.phoneno && <span className="error">{errors.phoneno}</span>}
      </div>
      <button className="" onClick={handleSubmit}>
        {isEditing ? "Update Data" : "Add Data"}
      </button>

      {/* Displaying the input array in a table */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inputarr.map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.phoneno}</td>
              <td>
                <div className="action-buttons">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
>>>>>>> ffd3e848e394ab9abb5b469b71a669ea292a4057

export default App;
