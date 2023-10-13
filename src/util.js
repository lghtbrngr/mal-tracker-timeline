export default
function dayOf(timestamp) {
  const d = new Date(timestamp);
  d.setHours(0, 0, 0, 0);
  return d;
}
