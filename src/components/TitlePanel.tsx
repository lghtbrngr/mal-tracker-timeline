import clsx from 'clsx';
import { Anime } from '../types';
import { measureHeight } from '../hooks';

interface TitlePanelProps {
  anime: Anime;
  width: number;
}

export default function TitlePanel({ anime, width }: TitlePanelProps) {
  const [height, ref] = measureHeight<HTMLDivElement>([width]);
  return (
    <div
      className={clsx([
        'absolute',
        'z-30',
        'border border-gray-400 border-b-0 bg-white',
        'p-1 text-xs overflow-hidden overflow-ellipsis',
      ])}
      style={{
        top: `-${height}px`,
        width,
      }}
      ref={ref}
    >
      {anime.node.title}
    </div>
  );
}
