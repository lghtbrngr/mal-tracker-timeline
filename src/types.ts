import { AsyncThunk } from '@reduxjs/toolkit';
import { incrementAnime as incrementAnimeJs } from './state/animeSlice';

export type Anime = Record<string, any>;

/* js-to-ts type shims */
export const incrementAnime = incrementAnimeJs as AsyncThunk<any, any, any>;
