import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchAnimeList } from '../state/animeSlice';
import Header from '../components/Header';
import Body from '../components/Body';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAnimeList());
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Body />
    </div>
  );
}

export default App;
