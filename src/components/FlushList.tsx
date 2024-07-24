import clsx from 'clsx';
import { ANIME_CARD_BOTTOM_PADDING, IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { measureHeight } from '../hooks';
import { Anime } from '../types';
import AnimeCard from './AnimeCard';

interface FlushListProps {
  list: Anime[];
}

export default function FlushList({ list }: FlushListProps) {
  const flushList = list.concat(list).slice(0, 9);
  // const flushList = list;

  const [containerHeight, containerRef] = measureHeight<HTMLDivElement>();
  console.log(containerHeight);

  // We have to manually set the flex container's width because flex-col flex-wrap
  // containers don't set their width properly. It's a known issue.
  const listHeight = containerHeight - ANIME_CARD_BOTTOM_PADDING;
  const itemsPerCol = Math.trunc(listHeight / IMAGE_HEIGHT);
  const colCount = Math.ceil(flushList.length / itemsPerCol) || 1;
  const width = colCount * IMAGE_WIDTH + 2; // 2 for border
  console.log(itemsPerCol, colCount, width);

  return (
    <div
      className="self-stretch flex flex-col border border-black"
    >
      <span>Flush List</span>
      <div
        className={clsx([
          'border border-black',
          'flex-grow min-h-0',
          'flex flex-col-reverse flex-wrap-reverse',
          'pb-[10px]',
        ])}
        style={{ width: `${width}px` }}
        ref={containerRef}
      >
        {flushList.map((anime) => (
          <AnimeCard key={anime.node.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
