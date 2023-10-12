import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnimeList, selectCwList } from './state/animeSlice';
import AnimeCard from './components/AnimeCard';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAnimeList());
  }, []);

  const cwList = useSelector(selectCwList);
  console.log(cwList);

  return (
    <div>
      {cwList.map(anime => <p key={anime.node.id}><AnimeCard anime={anime} /></p>)}
    </div>
  );
}

export default App;
