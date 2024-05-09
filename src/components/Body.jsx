import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Timeline from './Timeline';
import OnHoldTable from './OnHoldTable';
import { selectCwList } from '../state/animeSlice';

export default function Body() {
  const cwList = useSelector(selectCwList);

  return (
    <div className="flex-grow">
      <div className={clsx([
        'h-1/2',
        'flex flex-col justify-end',
        'pb-14 px-14 border-b border-black',
      ])}>
        {cwList.length > 0 ? (
          <Timeline />
        ) : (
          <div className="flex justify-center">No anime found in currently watching list</div>
        )}
      </div>
      <OnHoldTable />
    </div>
  );
}
