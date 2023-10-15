export function dayOf(timestamp) {
  const d = new Date(timestamp);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function monthOf(date) {
  return new Date(date.getFullYear(), date.getMonth());
}
