import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { ANIME_CARD_BOTTOM_PADDING, IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { measureHeight } from '../hooks';
import { Anime, updateAnimeStatusBulk } from '../types';
import AnimeCard from './AnimeCard';
import Button from './Button';
import Tooltip from './Tooltip';

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

interface OlderCWListProps {
  list: Anime[];
}

export default function OlderCWList({ list }: OlderCWListProps) {
  const [containerHeight, containerRef] = measureHeight<HTMLDivElement>();

  const dispatch = useDispatch<any>();
  const moveAllToOnHold = () => {
    dispatch(updateAnimeStatusBulk({
      animeIds: list.map((anime: Anime) => anime.node.id),
      status: 'on_hold',
    }));
  };

  /* We have to manually set the flex container's width because flex-col flex-wrap
   * containers don't set their width properly. It's a known issue. */
  const width = computeContainerWidth(containerHeight, list.length);
  const padding = `${ANIME_CARD_BOTTOM_PADDING}px`;

  const showAllOHButton = list.length > 1;

  return (
    <div
      className="self-stretch flex flex-col border-r border-black pr-6"
    >
      <div
        className={clsx([
          'flex-grow min-h-0',
          'flex flex-col-reverse flex-wrap-reverse',
          'border-b-2 border-black relative',
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
        <span
          className="text-sm absolute right-0"
          style={{
            bottom: `-${showAllOHButton ? 3.35 : 1.9}rem`,
          }}
        >
          <div className="text-right mb-0.5">Older</div>
          {showAllOHButton && (
            <Tooltip text="Move all to On Hold">
              <Button
                onClick={moveAllToOnHold}
                colors="border-yellow-600 hover:bg-yellow-400"
              >
                All OH
              </Button>
            </Tooltip>
          )}
        </span>
      </div>
    </div>
  );
}
