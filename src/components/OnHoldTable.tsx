import { useSelector } from 'react-redux';
import { selectOnHoldList } from '../state/animeSlice';
import { Anime } from '../types';

interface TableRowProps {
  anime: Anime,
}

function TableRow({ anime }: TableRowProps) {
  return (
    <tr>
      <td>{anime.node.title}</td>
      <td>
        {`${anime.list_status.num_episodes_watched} / ${anime.node.num_episodes}`}
      </td>
      <td>{anime.list_status.updated_at}</td>
      <td>
        todo
      </td>
    </tr>
  );
}

export default function OnHoldTable() {
  const onHoldList = useSelector(selectOnHoldList);
  console.log(onHoldList);
  return (
    <div className="border-r border-black p-2">
      <div className="flex justify-center pb-2">
        <span>On Hold</span>
      </div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Watched</th>
            <th>Last Updated</th>
            <th>Actions</th>
          </tr>
          {onHoldList.map((anime: Anime) => (
            <TableRow anime={anime} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
