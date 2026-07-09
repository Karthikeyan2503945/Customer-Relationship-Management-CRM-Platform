import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService';
import { mockUsers } from '../../data/users';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe }, thunkAPI) => {
    try {
      const response = await authService.login(email, password);
      if (response.success) {
        const token = response.data.accessToken;
        const user = response.data.user;
        if (rememberMe) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }
        return { token, user };
      } else {
        return thunkAPI.rejectWithValue(response.message || 'Login failed');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Login failed';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, thunkAPI) => {
    try {
      const response = await authService.getProfile();
      if (response.success) {
        return response.data.user;
      } else {
        return thunkAPI.rejectWithValue(response.message || 'Failed to fetch profile');
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Session expired';
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    return null;
  }
);

const initialState = {
  user: null,
  token: localStorage.getItem('token') || sessionStorage.getItem('token') || null,
  isAuthenticated: !!(localStorage.getItem('token') || sessionStorage.getItem('token')),
  loading: false,
  error: null,
  allUsers: mockUsers, // Loaded from central data folder for Admin management
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        const idx = state.allUsers.findIndex(u => u.id === state.user.id);
        if (idx !== -1) {
          state.allUsers[idx] = state.user;
        }
      }
    },
    adminAddUser: (state, action) => {
      const newUser = {
        id: `usr_${state.allUsers.length + 1}`,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        ...action.payload
      };
      state.allUsers.push(newUser);
    },
    adminUpdateUser: (state, action) => {
      const idx = state.allUsers.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) {
        state.allUsers[idx] = { ...state.allUsers[idx], ...action.payload };
      }
    },
    adminDeleteUser: (state, action) => {
      state.allUsers = state.allUsers.filter(u => u.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      // Login User
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload;
      })
      // Fetch Current User
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload;
      })
      // Logout User
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = null;
      });
  }
});

export const {
  updateProfile,
  adminAddUser,
  adminUpdateUser,
  adminDeleteUser,
} = authSlice.actions;

export default authSlice.reducer;
