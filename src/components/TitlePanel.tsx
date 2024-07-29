import clsx from 'clsx';
import { Anime } from '../types';
import { measureHeight } from '../hooks';

interface TitlePanelProps {
  anime: Anime;
}

export default function TitlePanel({ anime }: TitlePanelProps) {
  const [height, ref] = measureHeight<HTMLDivElement>();
  const url = `https://myanimelist.net/anime/${anime.node.id}`;
  return (
    <div
      className={clsx([
        'absolute',
        'z-30',
        'border border-gray-400 border-b-0 bg-white',
        'p-1 text-xs overflow-hidden overflow-ellipsis',
        'w-full',
      ])}
      style={{
        top: `-${height}px`,
      }}
      ref={ref}
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
