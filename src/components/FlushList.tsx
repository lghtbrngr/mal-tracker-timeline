import clsx from 'clsx';
import { ANIME_CARD_BOTTOM_PADDING, IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { measureHeight } from '../hooks';
import { Anime } from '../types';
import AnimeCard from './AnimeCard';

function computeContainerWidth(containerHeight: number, listLength: number) {
  /* Each item will have a padding of ANIME_CARD_BOTTOM_PADDING underneath it.
   * For the first item in a given column, it will be from the container's bottom padding.
   * For each subsequent item in the column, it will be the flex gap value. */
  const itemHeight = IMAGE_HEIGHT + ANIME_CARD_BOTTOM_PADDING;
  const itemsPerCol = Math.trunc(containerHeight / itemHeight);
  const colCount = Math.ceil(listLength / itemsPerCol) || 1;

  const colsWidth = colCount * IMAGE_WIDTH;
  // there are horizontal gaps between columns as well
  const xGapsWidth = ANIME_CARD_BOTTOM_PADDING * (colCount - 1);
  const bordersWidth = 2;
  return colsWidth + xGapsWidth + bordersWidth;
}

interface FlushListProps {
  list: Anime[];
}

export default function FlushList({ list }: FlushListProps) {
  const [containerHeight, containerRef] = measureHeight<HTMLDivElement>();

  /* We have to manually set the flex container's width because flex-col flex-wrap
   * containers don't set their width properly. It's a known issue. */
  const width = computeContainerWidth(containerHeight, list.length);
  const padding = `${ANIME_CARD_BOTTOM_PADDING}px`;

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
        ])}
        style={{
          width: `${width}px`,
          paddingBottom: padding,
          gap: padding,
        }}
        ref={containerRef}
      >
        {list.map((anime) => (
          <AnimeCard key={anime.node.id} anime={anime} />
        ))}
      </div>
    </div>
  );
}
