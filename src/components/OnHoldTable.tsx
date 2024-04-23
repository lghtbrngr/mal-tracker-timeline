import { useDispatch, useSelector } from 'react-redux';
import { selectOnHoldList } from '../state/animeSlice';
import { Anime, updateAnimeStatus } from '../types';
import Button from './Button';
import Tooltip from './Tooltip';

interface TableRowProps {
  anime: Anime,
}

function TableRow({ anime }: TableRowProps) {
  const dispatch = useDispatch<any>();

  const handleCW = () => {
    dispatch(updateAnimeStatus({
      animeId: anime.node.id,
      status: 'Currently Watching',
    }));
  };

  const watched = `${anime.list_status.num_episodes_watched} / ${anime.node.num_episodes}`;
  const lastUpdated = anime.list_status.updated_at.split('T')[0];
  return (
    <tr>
      <td className="pr-2">{anime.node.title}</td>
      <td className="pr-2 whitespace-nowrap">{watched}</td>
      <td className="pr-2">{lastUpdated}</td>
      <td className="pr-2 flex gap-1">
        <Tooltip text="Move to Currently Watching">
          <Button onClick={handleCW}>CW</Button>
        </Tooltip>
        <Tooltip text="Move to Dropped">
          <Button colors="bg-red-800 hover:bg-red-600">D</Button>
        </Tooltip>
      </td>
    </tr>
  );
}

export default function OnHoldTable() {
  const unsorted: Anime[] = useSelector(selectOnHoldList);

  const onHoldList = unsorted.toSorted((a, b) => (
    Date.parse(b.list_status.updated_at) - Date.parse(a.list_status.updated_at)
  ));
  console.log(onHoldList[0]);

  return (
    <div className="flex flex-col px-2 pt-2 overflow-hidden max-h-[50%]">
      <div className="flex justify-center pb-2 font-bold">
        <span>On Hold</span>
      </div>
      <div className="flex-grow overflow-auto">
        <table>
          <tbody>
            <tr className="whitespace-nowrap text-left">
              <th className="text-sm pr-2">Title</th>
              <th className="text-sm pr-2">Progress</th>
              <th className="text-sm pr-2">Last Updated</th>
              <th className="text-sm pr-2">Actions</th>
            </tr>
            {onHoldList.map((anime: Anime) => (
              <TableRow anime={anime} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
