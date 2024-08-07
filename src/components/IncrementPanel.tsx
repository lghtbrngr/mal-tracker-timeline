import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import { Anime, AnimeStatus, incrementAnime, updateAnimeStatus } from '../types';
import Tooltip from './Tooltip';

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

  const handleUpdateStatus = (status: AnimeStatus) => {
    dispatch(updateAnimeStatus({
      animeId: anime.node.id,
      status,
    }));
  };

  return (
    <span
      className={clsx([
        'grid min-w-[50px] z-20',
        'border border-gray-400 border-l-0 bg-white',
      ])}
    >
      <div className={clsx([
        'flex justify-center items-center',
        'p-1 text-sm whitespace-nowrap',
      ])}>
        {`${episodesWatched} / ${anime.node.num_episodes}`}
      </div>
      <button
        className="hover:bg-primary border-t border-gray-400 py-1.5 hover:text-white"
        onClick={handleIncrement}
      >
        +
      </button>
      <div className="flex">
        <Tooltip text="Move to On Hold" className="flex-grow">
          <button
            onClick={() => handleUpdateStatus('on_hold')}
            className={clsx([
              'text-sm hover:bg-yellow-400',
              'border-t border-l border-gray-400',
              'w-full h-full',
            ])}
          >
            OH
          </button>
        </Tooltip>
        <Tooltip text="Move to Dropped" className="flex-grow">
          <button
            onClick={() => handleUpdateStatus('dropped')}
            className={clsx([
              'text-sm hover:bg-red-600 hover:text-white',
              'border-t border-l border-gray-400',
              'w-full h-full',
            ])}
          >
            D
          </button>
        </Tooltip>
      </div>
    </span>
  );
}
