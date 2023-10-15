import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeList, selectCwList } from './state/animeSlice';
import AnimeCard from './components/AnimeCard';
import { IMAGE_WIDTH } from './constants';
import { dayOf } from './util';
import renderMonthMarkers from './components/renderMonthMarkers';
import { useBoundingClientRect } from './hooks';

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

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="relative border-b-2 border-black" ref={timelineRef}>
        {sortedList.map(anime => <AnimeCard anime={anime} timelineData={timelineData} />)}
        {sortedList.length > 0 && renderMonthMarkers(timelineData)}
      </div>
    </div>
  );
}

export default App;
