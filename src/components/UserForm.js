import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, updateUser, fetchUsers, selectUserById, SingleUser } from '../slices/UserSlice';

const AddUserForm = ({ editMode }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the user id from the URL params
  const user = useSelector(SingleUser); 
  // Retrieve user data by id
  useEffect(() => {
    // If editMode is true and user data is available, populate the form fields with user data
    if (editMode && user.user) {
      setName(user.user.name);
      setEmail(user.user.email);
    }
  }, [editMode, user.user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // If editMode is true, dispatch updateUser action, else dispatch addUser action
      if (editMode) {
        await dispatch(updateUser({ id, name, email }));
      } else {
        await dispatch(addUser({ name, email }));
      }
      // Clear form fields
      setName('');
      setEmail('');
      // Fetch updated user list
      dispatch(fetchUsers());
      // Redirect to the user list page
      navigate('/');
    } catch (error) {
      console.error('Error adding/updating user:', error);
      // Handle error, if any
    }
  };

  return (
    <div>
      <h2>{editMode ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit">{editMode ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default AddUserForm;
