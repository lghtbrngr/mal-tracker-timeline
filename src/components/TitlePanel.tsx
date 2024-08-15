import clsx from 'clsx';
import { Property } from 'csstype';
import { Anime } from '../types';
import { measureHeight } from '../hooks';

interface TitlePanelProps {
  anime: Anime;
}

export default function TitlePanel({ anime }: TitlePanelProps) {
  const [height, ref] = measureHeight<HTMLDivElement>();
  const url = `https://myanimelist.net/anime/${anime.node.id}`;
  const multilineEllipsisStyle = {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical' as Property.BoxOrient,
  };

  return (
    <div
      className={clsx([
        'absolute w-full z-30',
        'border border-gray-400 border-b-0 bg-white',
        'p-1 pb-0.5 text-xs overflow-hidden',
      ])}
      style={{
        top: `-${height}px`,
        ...multilineEllipsisStyle,
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
