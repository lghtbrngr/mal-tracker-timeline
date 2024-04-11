import AuthenticationLink from './AuthenticationLink';

export default function Header() {
  return (
    <nav className="bg-primary flex justify-between p-2">
      <span>MAL Tracker Timeline</span>
      <AuthenticationLink />
    </nav>
  );
}
