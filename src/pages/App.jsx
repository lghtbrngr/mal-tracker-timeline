import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeList, selectCwList } from '../state/animeSlice';
import AnimeCard from '../components/AnimeCard';
import renderMonthMarkers from '../components/renderMonthMarkers';
import Header from '../components/Header';
import { IMAGE_WIDTH } from '../constants';
import { dayOf } from '../util';
import { useBoundingClientRect } from '../hooks';

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

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAnimeList());
  }, []);

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
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col h-full justify-center">
        <div className="relative border-b-2 border-black" ref={timelineRef}>
          {sortedList.map((anime, i) => <AnimeCard anime={anime} position={positions[i]} />)}
          {sortedList.length > 0 && renderMonthMarkers(timelineData)}
        </div>
      </div>
    </div>
  );
}

export default App;
