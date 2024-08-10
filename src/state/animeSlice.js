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

export const updateAnimeStatusBulk =
  createPutThunk('anime/updateAnimeStatusBulk', '/api/updateAnimeStatusBulk');

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
        const { animeId, newStatus, oldStatus } = action.meta.arg;
        // Pop anime from source list
        let anime;
        if (oldStatus === 'on_hold') {
          const index = state.onHoldList.findIndex(a => a.node.id === animeId);
          anime = state.onHoldList.splice(index, 1)[0];
        } else if (oldStatus === 'watching') {
          const index = state.cwList.findIndex(a => a.node.id === animeId);
          anime = state.cwList.splice(index, 1)[0];
        }

        anime.list_status = action.payload;

        // Add anime to new list
        if (newStatus === 'watching') {
          state.cwList.push(anime);
        } else if (newStatus === 'on_hold') {
          state.onHoldList.push(anime);
        }
        // else if newStatus === 'dropped' do nothing because we don't show the dropped list
      })
      .addCase(updateAnimeStatusBulk.fulfilled, (state, action) => {
        // Assumes moving from cwList
        // Find each anime in the cw list and move it to the on hold list
        const { status, animeIds } = action.meta.arg;

        const animesToMove = [];
        state.cwList = state.cwList.filter(anime => {
          const index = animeIds.findIndex(animeId => animeId === anime.node.id);
          if (index < 0) {
            return true;
          }
          const updatedAnimeResult = action.payload[index];
          if (updatedAnimeResult.status !== 200) {
            // The anime didn't get updated successfully; leave in default state for now
            return true;
          }
          anime.list_status = updatedAnimeResult.json;
          animesToMove.push(anime);
          return false;
        });

        console.log(status, animesToMove);
        if (status === 'on_hold') {
          state.onHoldList.push(...animesToMove);
        }
      });
  },
});

export const selectCwList = state => state.anime.cwList;
export const selectOnHoldList = state => state.anime.onHoldList;

export default animeSlice.reducer;
