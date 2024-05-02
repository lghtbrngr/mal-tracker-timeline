import clsx from 'clsx';
import { measureWidth } from '../hooks';
import { Anime } from '../types';

interface DateLabelProps {
  anime: Anime;
  top: number;
}

export default function DateLabel({ anime, top }: DateLabelProps) {
  const date = new Date(anime.list_status.updated_at);
  const dateString = date.toLocaleDateString(undefined, {
    month: 'short',
    day: '2-digit',
  });

  const [width, ref] = measureWidth();

  return (
    <span
      className={clsx([
        'absolute z-10 mt-2',
        'border border-black bg-white',
        'text-xs px-1 whitespace-nowrap',
      ])}
      style={{
        top: `${top}px`,
        left: `-${width / 2}px`,
      }}
      ref={ref}
    >
      {dateString}
    </span>
  );
}
