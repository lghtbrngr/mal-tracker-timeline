import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { IMAGE_HEIGHT } from '../constants';
import { Anime, incrementAnime } from '../types';

interface IncrementPanelProps {
  anime: Anime;
}

export default function IncrementPanel({ anime }: IncrementPanelProps) {
  const dispatch = useDispatch<any>();

  const episodesWatched = anime.list_status.num_episodes_watched;
  const handleIncrement = () => {
    dispatch(incrementAnime({
      animeId: anime.node.id,
      episodesWatched: episodesWatched + 1,
    }));
  };

  return (
    <span
      className="border border-gray-400 border-l-0 bg-white grid min-w-[50px] z-20"
      style={{
        height: IMAGE_HEIGHT,
      }}
    >
      <div className={clsx([
        'flex justify-center items-center',
        'px-1 text-sm whitespace-nowrap',
      ])}>
        {`${episodesWatched} / ${anime.node.num_episodes}`}
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
