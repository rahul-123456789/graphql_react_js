import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/UserSlice'; 
import UserList from './components/UserList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddUserForm from './components/UserForm';

// Create Redux store with userReducer
const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/add-user" element={<AddUserForm editMode={false} />} />
          <Route path="/edit-user/:id" element={<AddUserForm editMode={true} />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
