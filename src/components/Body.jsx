import clsx from 'clsx';
import Timeline from './Timeline';
import OnHoldTable from './OnHoldTable';

export default function Body() {
  return (
    <div className="flex-grow">
      <div className={clsx([
        'h-1/2',
        'flex flex-col justify-end',
        'pb-14 px-14 border-b border-black',
      ])}>
        <Timeline />
      </div>
      <OnHoldTable />
    </div>
  );
}
