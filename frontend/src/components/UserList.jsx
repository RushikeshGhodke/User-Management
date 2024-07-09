import React, { useEffect, useState } from "react";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, deleteUser, updateUser } from "../features/userSlice";
import { FaRegEdit, FaRegSave } from "react-icons/fa";
import { MdDelete, MdOutlineCancel } from "react-icons/md";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFDocument from "./PDFDocument";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const userStatus = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);
  const [editUserId, setEditUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [sort, setSort] = useState("default"); // Default sort is 'default'

  useEffect(() => {
    if (userStatus === "idle") {
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
    dispatch(
      updateUser({
        id: editUserId,
        name: editFormData.name,
        email: editFormData.email,
        phone: editFormData.phone,
      })
    ).then(() => {
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

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  // Sort users based on the selected option
  const sortedUsers = [...users];
  if (sort === "asc") {
    sortedUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sort === "desc") {
    sortedUsers.sort((a, b) => b.name.localeCompare(a.name));
  }

  let content;

  if (userStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (userStatus === "succeeded") {
    content = (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, i) => (
            <tr key={i} className={editUserId === user.id ? "selected" : ""}>
              {editUserId === user.id ? (
                <>
                  <td>
                    <input
                      type="text"
                      name="name"
                      className="bigger-input"
                      value={editFormData.name}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      name="email"
                      className="bigger-input"
                      value={editFormData.email}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="phone"
                      className="bigger-input"
                      value={editFormData.phone}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button className="action-btn" onClick={handleSave}>
                      <FaRegSave />
                    </button>
                    <button className="action-btn" onClick={handleCancel}>
                      <MdOutlineCancel />
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      className="action-btn"
                      onClick={() => handleEdit(user)}
                    >
                      <FaRegEdit />
                    </button>
                    <button
                      className="action-btn"
                      onClick={() => handleDelete(user.id)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (userStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <div className="divider"></div>
      <div className="list-head">
        <h1 className="user-list-heading">User List</h1>
        <div className="btn-div">
        <div>
          <select value={sort} onChange={handleSortChange}>
            <option value="default">Default</option>
            <option value="asc">Sort by Name Ascending</option>
            <option value="desc">Sort by Name Descending</option>
          </select>
        </div>
        <button className="pdf-button">
          <PDFDownloadLink
            document={<PDFDocument users={users} />}
            fileName="user_list.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Download as PDF"
            }
          </PDFDownloadLink>
        </button>
        </div>
      </div>
      {content}
    </div>
  );
};

export default UserList;
