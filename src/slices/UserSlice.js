import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { gql } from "@apollo/client";
import client from "../graphqlClient";

// Define a GraphQL query for fetching users
const FETCH_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

// Define an async thunk for fetching users from the GraphQL API
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await client.query({ query: FETCH_USERS_QUERY });
    console.log(response.data);
    return response.data.users;
  } catch (error) {
    throw error;
  }
});

// Define a GraphQL mutation for adding a user
const ADD_USER_MUTATION = gql`
  mutation createUser($name: String!, $email: String!) {
    createUser(userData: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

// Define an async thunk for adding a user using the GraphQL API
export const addUser = createAsyncThunk(
  "users/addUser",
  async ({ name, email }) => {
    try {
      const response = await client.mutate({
        mutation: ADD_USER_MUTATION,
        variables: { name, email },
      });
      // Assuming the mutation response returns the created user data directly
      return response.data.userData;
    } catch (error) {
      throw error;
    }
  }
);

const DELETE_USER_MUTATION = gql`
  mutation deleteUser($id: Float!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

// Define an async thunk for deleting a user using the GraphQL API
export const deleteUser = createAsyncThunk("users/deleteUser", async (id) => {
  try {
    // Convert the id to a float (if necessary)
    const idFloat = parseFloat(id);

    // Call the GraphQL mutation with the provided ID
    await client.mutate({
      mutation: DELETE_USER_MUTATION,
      variables: { id: idFloat },
    });
    return id; // Return the ID of the deleted user
  } catch (error) {
    throw error; // Throw any errors encountered during the mutation
  }
});
const FETCH_SINGLE_USER_QUERY = gql`
  query getUser($id: Float!) {
    user(id: $id) {
      id
      name
      email
    }
  }
`;
// Define an async thunk for deleting a user using the GraphQL API
export const selectUserById = createAsyncThunk(
  "users/selectUserById",
  async (id) => {
    try {
      // Convert the id to a float (if necessary)
      const idFloat = parseFloat(id);

      // Call the GraphQL mutation with the provided ID
      const response =  await client.query({
        query: FETCH_SINGLE_USER_QUERY,
        variables: { id: idFloat },
      });
      return response.data;
    } catch (error) {
      throw error; // Throw any errors encountered during the mutation
    }
  }
);
// Define a GraphQL mutation for updating a user
const UPDATE_USER_MUTATION = gql`
  mutation updateUser($id: Float!, $name: String!, $email: String!) {
    updateUser(id: $id, userData: { name: $name, email: $email }) {
      id
      name
      email
    }
  }
`;

// Define an async thunk for updating a user using the GraphQL API
export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, name, email }) => {
    try {
      const idFloat = parseFloat(id);
      const response = await client.mutate({
        mutation: UPDATE_USER_MUTATION,
        variables: { id: idFloat, name, email },
      });
      return response.data.updateUser;
    } catch (error) {
      throw error;
    }
  }
);

// Define a slice for managing user state
const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload); // Add the new user to the users array
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users.push(action.payload); // Add the new user to the users array
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }).addCase(selectUserById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(selectUserById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;  // Add the new user to the users array
      })
      .addCase(selectUserById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default userSlice.reducer;
export const selectUsersStatus = (state) => state.users.status;
// Selector function to retrieve all users from state
export const selectAllUsers = (state) => state.users.users;
export const SingleUser = (state) => state.users.user;