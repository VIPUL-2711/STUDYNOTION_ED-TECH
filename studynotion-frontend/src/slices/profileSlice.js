import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  loading: false,
}

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
    setProfileLoading(state, action) {
      state.loading = action.payload
    },
  },
})

export const { setUser, setProfileLoading } = profileSlice.actions
export default profileSlice.reducer
