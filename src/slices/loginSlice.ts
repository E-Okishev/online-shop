import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../App";
import { UserType } from "../utils";

const getUsers = async (): Promise<UserType[]> => {
  const usersResult = await fetch(`${BASE_URL}/users`);
  return await usersResult.json();
};

export const login = createAsyncThunk<
  UserType,
  UserType,
  { rejectValue: { message: string } }
>("user/login", async (userForm, { rejectWithValue }) => {
  const users: UserType[] = await getUsers();

  const checkUser = users.find(
    (user) =>
      user.login === userForm.login && user.password === userForm.password
  );

  if (checkUser) {
    return checkUser;
  } else {
    return rejectWithValue({ message: "Не верный логин или пароль" });
  }
});

export const registation = createAsyncThunk<
  UserType,
  UserType,
  { rejectValue: { message: string } }
>("user/registation", async (userForm, { rejectWithValue }) => {
  const users: UserType[] = await getUsers();

  const checkUser = users.some(
    (user) => user.login === userForm.login || user.phone === userForm.phone
  );

  if (checkUser) {
    return rejectWithValue({
      message: "Пользователь уже зарегистрирован. Войдите",
    });
  }

  const result = await fetch(`${BASE_URL}/users`, {
    method: "Post",
    body: JSON.stringify(userForm),
    headers: {
      "Content-type": "application/json",
    },
  });
  const user: UserType = await result.json();
  return user;
});

type InitialStateTypes = {
  user: UserType | null;
  error: null | string;
};

const initialState: InitialStateTypes = {
  user: null,
  error: null,
};

export const registrationSlice = createSlice({
  name: "registrationSlice ",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(registation.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(registation.rejected, (state, action) => {
      state.error = action.payload ? action.payload.message : null;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload ? action.payload.message : null;
    });
  },
  reducers: {},
});

export default registrationSlice.reducer;
