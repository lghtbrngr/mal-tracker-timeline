import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  cwList: [],
  onHoldList: [],
};

function createPutThunk(thunkName, endpoint) {
  return createAsyncThunk(thunkName, async (payload) => {
    const response = await fetch(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    if (response.status !== 200) {
      const errorMessage = await response.json();
      throw new Error(errorMessage);
    }
    return response.json();
  });
}

export const fetchAnimeList =
  createAsyncThunk('anime/fetchAnimeList', async () => (await fetch('/api/animelist')).json());

export const incrementAnime = createPutThunk('anime/incrementAnime', '/api/incrementAnime');

export const updateAnimeStatus =
  createPutThunk('anime/updateAnimeStatus', '/api/updateAnimeStatus');

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
      })
      .addCase(updateAnimeStatus.fulfilled, (state, action) => {
        // The following works for now, but will need attention if we ever allow updating statuses
        // of anime on other lists than the onHoldList
        const { status, animeId } = action.meta.arg;
        const index =
          state.onHoldList.findIndex(anime => anime.node.id === animeId);
        const anime = state.onHoldList.splice(index, 1)[0];
        anime.list_status = action.payload;
        if (status === 'watching') {
          state.cwList.push(anime);
        }
      });
  },
});

export const selectCwList = state => state.anime.cwList;
export const selectOnHoldList = state => state.anime.onHoldList;

export default animeSlice.reducer;
