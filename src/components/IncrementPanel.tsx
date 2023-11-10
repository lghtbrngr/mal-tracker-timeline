import React from 'react';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { Anime } from '../types';

interface IncrementPanelProps {
  anime: Anime;
}

export default function IncrementPanel({ anime }: IncrementPanelProps) {
  return (
    <span
      className="border border-gray-400 border-l-0"
      style={{
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
      }}
    >
      {anime.list_status.num_episodes_watched}
      {' '}
      / ?
    </span>
  );
}
