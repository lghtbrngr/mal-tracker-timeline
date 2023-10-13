import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeList, selectCwList } from './state/animeSlice';

const IMAGE_WIDTH = 50;

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
    leastRecentDate =
      new Date(sortedList[sortedList.length - 1].list_status.updated_at);
    timespan = new Date() - leastRecentDate;
  }
  const operationalWidth = timelineWidth - IMAGE_WIDTH;

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="relative border-b-2 border-black" ref={timelineRef}>
        {sortedList.map(anime => {
          const date = new Date(anime.list_status.updated_at);
          const percentage = (date - leastRecentDate) / timespan;
          const offset = percentage * operationalWidth;
          console.log(offset);
          return (
            <img
              src={anime.node.main_picture.medium}
              width={IMAGE_WIDTH}
              alt=""
              className="absolute -top-20"
              style={{
                left: `${offset}px`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
