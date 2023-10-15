import React from 'react';
import { monthOf } from '../util';

function monthsInInterval(firstDate, finalDate) {
  const firstMonth = monthOf(firstDate);
  const finalMonth = monthOf(finalDate);

  const months = [firstMonth];
  const currentMonth = new Date(firstMonth);
  while (currentMonth.valueOf() < finalMonth.valueOf()) {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    months.push(new Date(currentMonth));
  }
  return months;
}

export default function renderMonthMarkers(timelineData) {
  const interval = monthsInInterval(timelineData.leastRecentDate, new Date());
  return interval.map(month => {
    // const label = `${month.getMonth()}-${month.getYear()}`;
    const offset = timelineData.offset(month.valueOf());
    console.log(month, offset);
    return (
      <span
        className="absolute border-l-2 border-black h-4 w-0"
        style={{
          left: `${offset}px`,
        }}
      />
    );
  });
}
