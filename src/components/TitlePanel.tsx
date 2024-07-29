import clsx from 'clsx';
import { Anime } from '../types';

interface TitlePanelProps {
  anime: Anime;
}

export default function TitlePanel({ anime }: TitlePanelProps) {
  const url = `https://myanimelist.net/anime/${anime.node.id}`;
  return (
    <div
      className={clsx([
        'w-full relative z-30',
        'border border-gray-400 border-b-0 bg-white',
        'p-1 text-xs overflow-hidden overflow-ellipsis',
      ])}
    >
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="font-bold text-blue-800 hover:underline"
      >
        {anime.node.title}
      </a>
    </div>
  );
}
