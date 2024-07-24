import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { measureHeight } from '../hooks';
import { Anime } from '../types';
import AnimeCard from './AnimeCard';

interface FlushListProps {
  list: Anime[];
}

export default function FlushList({ list }: FlushListProps) {
  const flushList = list.concat(list);
  // const flushList = list;

  const [listHeight, listRef] = measureHeight<HTMLDivElement>();
  console.log(listHeight);

  // We have to manually set the flex container's width because flex-col flex-wrap
  // containers don't set their width properly. It's a known issue.
  const itemsPerCol = Math.trunc(listHeight / IMAGE_HEIGHT);
  const colCount = Math.ceil(flushList.length / itemsPerCol) || 1;
  const width = colCount * IMAGE_WIDTH + 2; // 2 for border
  console.log(itemsPerCol, colCount, width);

  return (
    <div
      className="border border-black flex flex-col flex-wrap self-stretch"
      style={{ width: `${width}px` }}
      ref={listRef}
    >
      {flushList.map((anime) => (
        <AnimeCard key={anime.node.id} anime={anime} />
      ))}
    </div>
  );
}
