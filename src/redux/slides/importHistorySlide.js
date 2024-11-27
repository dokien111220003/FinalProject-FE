import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  search: '',
}

export const importHistorySlide = createSlice({
  name: 'importHistory',
  initialState,
  reducers: {
    searchImportHistory: (state, action) => {
      state.search = action.payload
    },
  },
})

export const { searchImportHistory } = importHistorySlide.actions

export default importHistorySlide.reducer