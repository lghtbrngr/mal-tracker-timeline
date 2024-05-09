import { useSelector } from 'react-redux';
import { measureWidth, useWindowSize } from '../hooks';
import AnimeCard from './AnimeCard';
import renderMonthMarkers from './renderMonthMarkers';
import { IMAGE_WIDTH } from '../constants';
import { dayOf } from '../util';
import { selectCwList } from '../state/animeSlice';

function sortAndSplitByCutoffDate(sourceCWList) {
  const cwList = sourceCWList.slice();
  cwList.sort((a, b) => { // sorted by last updated date, most recent first
    const d1 = new Date(a.list_status.updated_at);
    const d2 = new Date(b.list_status.updated_at);
    return d2 - d1;
  });

  // split the array in two based on the cutoff date
  const cutoffDate = dayOf(new Date());
  cutoffDate.setMonth(cutoffDate.getMonth() - 3);
  const cutoffIndex = cwList.findIndex(a => new Date(a.list_status.updated_at) < cutoffDate);
  const flushList = cutoffIndex > -1 ? cwList.splice(cutoffIndex) : [];

  return [cwList, flushList];
}

function calculatePositions(cwList, offset) {
  // Calculate the horizontal and vertical positions of each anime in the cwList
  // Assumption: list is sorted from most recent (rightmost) to least recent
  // x represents an offset in pixels; y represents a distinct channel, or row
  if (cwList.length === 0) return [];
  const xOffsets = cwList.map(anime => offset(dayOf(anime.list_status.updated_at)));
  const positions = [{ x: xOffsets[0], y: 0 }];
  for (let i = 1; i < xOffsets.length; i += 1) {
    const x = xOffsets[i];
    const wouldOverlap = x > xOffsets[i - 1] - IMAGE_WIDTH;
    const y = wouldOverlap ? positions[i - 1].y + 1 : 0;
    positions.push({ x, y });
  }
  return positions;
}

function computeTimelineSpan(cwList, timelineWidth) {
  // Figure the range of days the timeline will represent, and return a function that can
  // convert a date within the timeline's range into the corresponding pixel offset from the
  // beginning of the timeline.
  // Assumption: list is sorted from most recent (rightmost) to least recent
  const leastRecentDate = dayOf(cwList[cwList.length - 1].list_status.updated_at);
  const timespan = dayOf(new Date()) - leastRecentDate;
  const horizontalPadding = IMAGE_WIDTH; // don't cut off image at either side of the timeline
  const leftPadding = horizontalPadding / 2;
  const findOffset = (date) => {
    const percentage = (date.valueOf() - leastRecentDate.valueOf()) / timespan;
    return percentage * (timelineWidth - horizontalPadding) + leftPadding;
  };
  return [findOffset, leastRecentDate];
}

/* Assumption: currently watching list is loaded and has at least one entry */
export default function Timeline() {
  const windowWidth = useWindowSize()[0];
  const [timelineWidth, timelineRef] = measureWidth([windowWidth]);

  const sourceCWList = useSelector(selectCwList);

  const [cwList, flushList] = sortAndSplitByCutoffDate(sourceCWList);
  const [findOffset, leastRecentDate] = computeTimelineSpan(cwList, timelineWidth);
  const positions = calculatePositions(cwList, findOffset);

  return (
    <div className="relative border-b-2 border-black" ref={timelineRef}>
      {cwList.map((anime, i) => (
        <AnimeCard key={anime.node.id} anime={anime} position={positions[i]} />
      ))}
      {renderMonthMarkers(leastRecentDate, findOffset)}
    </div>
  );
}
