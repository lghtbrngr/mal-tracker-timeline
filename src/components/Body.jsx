import clsx from 'clsx';
import Timeline from './Timeline';
import OnHoldTable from './OnHoldTable';

export default function Body() {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className={clsx([
        'col-span-2 flex flex-col justify-end',
        'pb-14 px-14 border-b border-black',
      ])}>
        <Timeline />
      </div>
      <OnHoldTable />
    </div>
  );
}
