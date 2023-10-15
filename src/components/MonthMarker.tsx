import React, { useLayoutEffect, useRef, useState } from 'react';

function useBoundingClientRect() {
  const ref = useRef(null) as any;
  const [rect, setRect] = useState(null);
  useLayoutEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}

interface MonthMarkerProps {
  month: Date;
  timelineData: {
    leastRecentDate: Date;
    offset: (d: Date) => number;
  };
}

export default function MonthMarker({ month, timelineData }: MonthMarkerProps) {
  const [rect, labelRef] = useBoundingClientRect();
  const labelOffset = rect ? rect.width / 2 : 0;

  const label = `${month.getMonth() + 1}-${month.getFullYear()}`;
  const offset = timelineData.offset(month);
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
