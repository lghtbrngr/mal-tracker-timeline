import React from 'react';
import IMAGE_WIDTH from '../constants';
import { dayOf } from '../util';

type Anime = Record<string, any>;
interface AnimeCardProps {
  anime: Anime;
  timelineData: {
    leastRecentDate: Date;
    offset: (a: Anime) => number;
  };
}

export default function AnimeCard({ anime, timelineData }: AnimeCardProps) {
  const date = dayOf(anime.list_status.updated_at);
  const offset = timelineData.offset(date);
  return (
    <img
      src={anime.node.main_picture.medium}
      width={IMAGE_WIDTH}
      alt=""
      className="absolute -top-20"
      style={{
        left: `${offset}px`,
      }}
    />
  );
}
