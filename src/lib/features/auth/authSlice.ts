import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: { user: {}, token: '' },
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
    },
    setToken: (state, action) => {
      const { token } = action.payload;
      state.token = token;
    },
    logout: (state, action) => {
      state.user = {};
      state.token = '';
    },
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
  },
  selectors: {
    selectUser: (auth) => auth.user,
    selectToken: (auth) => auth.token,
  },
});

export const { setUser, setToken, logout, login } = authSlice.actions;
export const { selectUser, selectToken } = authSlice.selectors;
export default authSlice.reducer;
