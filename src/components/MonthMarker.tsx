import { useBoundingClientRect } from '../hooks';

interface MonthMarkerProps {
  month: Date;
  findOffset: (d: Date) => number;
}

export default function MonthMarker({ month, findOffset }: MonthMarkerProps) {
  const [rect, labelRef] = useBoundingClientRect() as any;
  const labelOffset = rect ? rect.width / 2 : 0;

  const label = month.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
  });
  const offset = findOffset(month);
  return (
    <span
      className="absolute border-l border-black h-3 -top-[5px]"
      style={{
        left: `${offset}px`,
      }}
    >
      <span
        ref={labelRef}
        className="relative top-3 text-sm"
        style={{
          left: `-${labelOffset}px`,
        }}
      >
        {label}
      </span>
    </span>
  );
}
