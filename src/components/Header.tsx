import AuthenticationLink from './AuthenticationLink';

export default function Header() {
  return (
    <nav className="bg-primary flex justify-between items-center p-2 text-white">
      <span className="text-xl">MAL Tracker Timeline</span>
      <AuthenticationLink />
    </nav>
  );
}
