import { monthOf } from '../util';
import MonthMarker from './MonthMarker';

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
  return interval.map(month => (
    <MonthMarker
      key={month.valueOf()}
      month={month}
      timelineData={timelineData}
    />
  ));
}
