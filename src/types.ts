import { AsyncThunk } from '@reduxjs/toolkit';
import {
  incrementAnime as incrementAnimeJs,
  updateAnimeStatus as updateAnimeStatusJs,
} from './state/animeSlice';

export type Anime = Record<string, any>;

/* js-to-ts type shims */
export const incrementAnime = incrementAnimeJs as AsyncThunk<any, any, any>;
export const updateAnimeStatus = updateAnimeStatusJs as AsyncThunk<any, any, any>;
