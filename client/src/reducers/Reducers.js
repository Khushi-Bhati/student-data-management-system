import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
};

const StudentSlice = createSlice({
  name: "Student",
  initialState,
  reducers: {
    setProfileData: (state, action) => {
      state.profile = action.payload;
    },
  },
});

// Export actions from the slice
export const { setProfileData } = StudentSlice.actions;

// Export the reducer
export const Studentreducer = StudentSlice.reducer;
