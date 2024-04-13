import clsx from 'clsx';
import Timeline from './Timeline';

export default function Body() {
  return (
    <div className="grid grid-cols-2 h-full">
      <div className={clsx([
        'col-span-2 flex flex-col justify-end',
        'pb-14 px-14 border-b border-black',
      ])}>
        <Timeline />
      </div>
      <div className="border-r border-black p-2">
        <div className="flex justify-center pb-2">
          <span>On Hold</span>
        </div>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>Watched</th>
              <th>On Hold Date</th>
              <th>Actions</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
