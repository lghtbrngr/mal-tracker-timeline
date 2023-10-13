import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeList, selectCwList } from './state/animeSlice';
import AnimeCard from './components/AnimeCard';
import IMAGE_WIDTH from './constants';
import dayOf from './util';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAnimeList());
  }, []);

  const timelineRef = useRef(null);
  const [timelineWidth, setTimelineWidth] = useState(1);

  useLayoutEffect(() => {
    if (timelineRef.current) {
      const { width } = timelineRef.current.getBoundingClientRect();
      setTimelineWidth(width);
    }
  }, []);
  console.log(timelineWidth);

  const cwList = useSelector(selectCwList);
  console.log(cwList);

  const sortedList = cwList.slice();
  sortedList.sort((a, b) => {
    const d1 = new Date(a.list_status.updated_at);
    const d2 = new Date(b.list_status.updated_at);
    return d2 - d1;
  });

  let leastRecentDate = null;
  let timespan = null;
  if (sortedList.length > 0) {
    leastRecentDate = dayOf(sortedList[sortedList.length - 1].list_status.updated_at);
    timespan = dayOf(new Date()) - leastRecentDate;
  }
  const operationalWidth = timelineWidth - IMAGE_WIDTH;

  const timelineData = {
    leastRecentDate,
    timespan,
    operationalWidth,
  };

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="relative border-b-2 border-black" ref={timelineRef}>
        {sortedList.map(anime => <AnimeCard anime={anime} timelineData={timelineData} />)}
      </div>
    </div>
  );
}

export default App;
