import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// registerUser
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/registerUser",
        info.data
      );
      info.navigate("/Login");
      return data;
    } catch (errors) {
      return rejectWithValue(errors.response.data.msg);
    }
  }
);
// loginUser
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/user/loginUser",
        info.data
      );

      info.navigate("/Chat");
      return data;
    } catch (errors) {
      return rejectWithValue(errors.response.data.msg);
    }
  }
);
// load user information
export const loadUserInfo = createAsyncThunk(
  "user/loadUserInfo",
  async (info, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/user/personInfo"
      );
      return data;
    } catch (errors) {
      return rejectWithValue(errors.response.data.msg);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userList: [],
    userInfo: {},
    token: localStorage.getItem("token") || null,
    isAuth: Boolean(localStorage.getItem("isAuth")) || false,
    errors: null,
    role: localStorage.getItem("role") || null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuth = false;
      state.role = "";
      localStorage.clear();
    },
  },
  extraReducers: {
    [registerUser.fulfilled]: (state, action) => {
      state.userList = action.payload;
    },
    [registerUser.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.token = action.payload.token;
      state.role = action.payload.role;
      localStorage.setItem("isAuth", true);
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    [loginUser.rejected]: (state, action) => {
      state.errors = action.payload;
    },
    [loadUserInfo.fulfilled]: (state, action) => {
      state.userInfo = action.payload;
    },
    [loadUserInfo.rejected]: (state, action) => {
      state.errors = action.payload;
    },
  },
});
export default userSlice.reducer;
export const { logout } = userSlice.actions;
