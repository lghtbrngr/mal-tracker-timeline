import React from 'react';
import { useDispatch } from 'react-redux';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { Anime, incrementAnime } from '../types';

interface IncrementPanelProps {
  anime: Anime;
}

export default function IncrementPanel({ anime }: IncrementPanelProps) {
  const dispatch = useDispatch<any>();

  const episodesWatched = anime.list_status.num_episodes_watched;
  const handleIncrement = () => {
    dispatch(incrementAnime({
      episodesWatched: episodesWatched + 1,
      animeId: anime.node.id,
    }));
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
