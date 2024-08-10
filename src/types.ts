import { AsyncThunk } from '@reduxjs/toolkit';
import {
  incrementAnime as incrementAnimeJs,
  updateAnimeStatus as updateAnimeStatusJs,
  updateAnimeStatusBulk as updateAnimeStatusBulkJs,
} from './state/animeSlice';

export type Anime = Record<string, any>;
export type AnimeStatus = 'watching' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_watch';

/* js-to-ts type shims */
export const incrementAnime = incrementAnimeJs as AsyncThunk<any, any, any>;

interface UpdateAnimeStatusThunkArg {
  animeId: string;
  newStatus: AnimeStatus;
  oldStatus: AnimeStatus; // Used to remove the anime from the old list in the UI
}

export const updateAnimeStatus = updateAnimeStatusJs as
  AsyncThunk<any, unknown, any> as
  AsyncThunk<any, UpdateAnimeStatusThunkArg, any>;

interface UpdateAnimeStatusBulkThunkArg {
  animeIds: string[];
  status: AnimeStatus;
}

export const updateAnimeStatusBulk = updateAnimeStatusBulkJs as
  AsyncThunk<any, unknown, any> as
  AsyncThunk<any, UpdateAnimeStatusBulkThunkArg, any>;
