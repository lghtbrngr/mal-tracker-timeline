import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cwList: [],
  onHoldList: [],
};

export const fetchAnimeList =
  createAsyncThunk('anime/fetchAnimeList', async () => (await fetch('/api/animelist')).json());

export const incrementAnime = createAsyncThunk('anime/incrementAnime', async (args) => {
  const response = await fetch('/api/incrementAnime', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  });
  if (response.status !== 200) {
    const errorMessage = await response.json();
    throw new Error(errorMessage);
  }
  return response.json();
});

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchAnimeList.fulfilled, (state, action) => {
        state.cwList = action.payload.watching;
        state.onHoldList = action.payload.onHold;
      })
      .addCase(incrementAnime.fulfilled, (state, action) => {
        const index = state.cwList.findIndex(anime => anime.node.id === action.meta.arg.animeId);
        state.cwList[index].list_status = action.payload;
      });
  },
});

export const selectCwList = state => state.anime.cwList;
export const selectOnHoldList = state => state.anime.onHoldList;

export default animeSlice.reducer;
