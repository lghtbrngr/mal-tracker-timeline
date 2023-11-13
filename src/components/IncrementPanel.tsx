import React from 'react';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { Anime } from '../types';

interface IncrementPanelProps {
  anime: Anime;
}

export default function IncrementPanel({ anime }: IncrementPanelProps) {
  const episodesWatched = anime.list_status.num_episodes_watched;
  const handleIncrement = () => {
    // TODO: call mal api from backend to increment
  };

  return (
    <span
      className="border border-gray-400 border-l-0 bg-white grid"
      style={{
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
      }}
    >
      <div className="text-center">
        {`${episodesWatched} / ?`}
      </div>
      <button
        className="hover:bg-green-700 border-t border-gray-400"
        onClick={handleIncrement}
      >
        +
      </button>
    </span>
  );
}
