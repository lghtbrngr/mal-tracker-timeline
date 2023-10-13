import React from 'react';
import dayOf from '../util';
import IMAGE_WIDTH from '../constants';

interface AnimeCardProps {
  anime: Record<string, any>;
  timelineData: {
    leastRecentDate: Date;
    timespan: number;
    operationalWidth: number;
  };
}

export default function AnimeCard({ anime, timelineData }: AnimeCardProps) {
  const { leastRecentDate, timespan, operationalWidth } = timelineData;
  const date = dayOf(anime.list_status.updated_at);
  const percentage = (date.valueOf() - leastRecentDate.valueOf()) / timespan;
  const offset = percentage * operationalWidth;
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
