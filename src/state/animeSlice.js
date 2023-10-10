import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cwList: [],
};

export const fetchAnimeList =
  createAsyncThunk('anime/fetchAnimeList', async () => (await fetch('/api/animelist')).json());

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAnimeList.fulfilled, (state, action) => {
        state.cwList = action.payload.data;
      });
  },
});

export const selectCwList = state => state.anime.cwList;

export default animeSlice.reducer;
