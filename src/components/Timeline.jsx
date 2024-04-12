import { useSelector } from 'react-redux';
import { useBoundingClientRect } from '../hooks';
import AnimeCard from './AnimeCard';
import renderMonthMarkers from './renderMonthMarkers';
import { IMAGE_WIDTH } from '../constants';
import { dayOf } from '../util';
import { selectCwList } from '../state/animeSlice';

function calculatePositions(sortedList, offset) {
  // Calculate the horizontal and vertical positions of each anime in the sortedList
  // Assumption: list is sorted from most recent (rightmost) to least recent
  // x represents an offset in pixels; y represents a distinct channel, or row
  if (sortedList.length === 0) return [];
  const xOffsets = sortedList.map(anime => offset(dayOf(anime.list_status.updated_at)));
  const positions = [{ x: xOffsets[0], y: 0 }];
  for (let i = 1; i < xOffsets.length; i += 1) {
    const x = xOffsets[i];
    const wouldOverlap = x > xOffsets[i - 1] - IMAGE_WIDTH;
    const y = wouldOverlap ? positions[i - 1].y + 1 : 0;
    positions.push({ x, y });
  }
  return positions;
}

export default function Timeline() {
  const [rect, timelineRef] = useBoundingClientRect();
  const timelineWidth = rect?.width || 1;

  const cwList = useSelector(selectCwList);

  const sortedList = cwList.slice();
  sortedList.sort((a, b) => {
    const d1 = new Date(a.list_status.updated_at);
    const d2 = new Date(b.list_status.updated_at);
    return d2 - d1;
  });

  let timelineData = {};
  if (sortedList.length > 0) {
    const leastRecentDate = dayOf(sortedList[sortedList.length - 1].list_status.updated_at);
    timelineData = {
      leastRecentDate,
      offset: (date) => {
        const timespan = dayOf(new Date()) - leastRecentDate;
        const percentage = (date.valueOf() - leastRecentDate.valueOf()) / timespan;
        const horizontalPadding = IMAGE_WIDTH; // don't cut off image at either side of the timeline
        const leftPadding = horizontalPadding / 2;
        return percentage * (timelineWidth - horizontalPadding) + leftPadding;
      },
    };
  }

  const positions = calculatePositions(sortedList, timelineData.offset);

  return (
    <div className="relative border-b-2 border-black" ref={timelineRef}>
      {sortedList.map((anime, i) => (
        <AnimeCard key={anime.node.id} anime={anime} position={positions[i]} />
      ))}
      {sortedList.length > 0 && renderMonthMarkers(timelineData)}
    </div>
  );
}
