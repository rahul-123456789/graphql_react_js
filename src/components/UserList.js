import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, selectAllUsers, selectUsersStatus, deleteUser, selectUserById } from '../slices/UserSlice';
import { Link, useNavigate } from 'react-router-dom'; 

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);
  const status = useSelector(selectUsersStatus); 
  const navigate = useNavigate(); // Get navigate function from React Router
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    // Dispatch the deleteUser action with the user id
    dispatch(deleteUser(id));
  };

  const handleEdit = (id) => {
    dispatch(selectUserById(id));
    // Dispatch an action to fetch the user data by ID
    // The fetched user data will be stored in the Redux store
    // You can then navigate to the edit user form page
    // and the form fields will be populated with the fetched user data
    // dispatch(fetchUserById(id));
    navigate(`/edit-user/${id}`);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (users.length === 0) {
    return <div>No users to display.</div>;
  }

  return (
    <div>
      <h2>User List</h2>
      <Link to="/add-user">Add User</Link> {/* Link to the add-user route */}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
            <button onClick={() => handleDelete(user.id)}>Delete</button> {/* Delete button */}
            <button onClick={() => handleEdit(user.id)}>Edit</button> {/* Edit button */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
