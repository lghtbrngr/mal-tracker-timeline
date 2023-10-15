import React from 'react';
import clsx from 'clsx';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { dayOf } from '../util';
import { Anime } from '../types';

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

  const tickWidth = 2;
  const imageOffset = (IMAGE_WIDTH - tickWidth) / 2;
  return (
    <div
      className="absolute -top-20"
      style={{
        left: `${offset}px`,
      }}
    >
      <img
        src={anime.node.main_picture.medium}
        width={IMAGE_WIDTH}
        className={clsx([
          'relative',
          'border border-black',
          'max-w-none',
        ])}
        style={{
          left: `-${imageOffset}px`,
          height: IMAGE_HEIGHT,
        }}
        alt=""
      />
      <span
        className="absolute border-l-2 border-black h-[11px]"
      />
    </div>
  );
}
