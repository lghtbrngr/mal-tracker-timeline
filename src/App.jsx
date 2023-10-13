import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeList, selectCwList } from './state/animeSlice';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAnimeList());
  }, []);

  const cwList = useSelector(selectCwList);
  console.log(cwList);

  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="relative border-b-2 border-black">
        <img
          src={cwList[0].node.main_picture.medium}
          width="50"
          alt=""
          className="absolute -top-20 left-1/2"
        />
      </div>
    </div>
  );
}

export default App;
