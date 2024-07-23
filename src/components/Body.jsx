import { useSelector } from 'react-redux';
import Timeline from './Timeline';
import OnHoldTable from './OnHoldTable';
import { selectCwList } from '../state/animeSlice';

export default function Body() {
  const cwList = useSelector(selectCwList);

  return (
    <div className="flex-grow min-h-0">
      {cwList.length > 0 ? (
        <Timeline />
      ) : (
        <div className="flex justify-center">No anime found in currently watching list</div>
      )}
      <OnHoldTable />
    </div>
  );
}
