import { useDispatch } from 'react-redux';
import { fetchAnimeList } from '../state/animeSlice';
import Header from '../components/Header';
import Body from '../components/Body';
import { callOnce } from '../hooks';

function App() {
  const dispatch = useDispatch();
  callOnce(() => {
    dispatch(fetchAnimeList());
  });

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Body />
    </div>
  );
}

export default App;
