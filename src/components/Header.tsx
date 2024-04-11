import AuthenticationLink from './AuthenticationLink';

export default function Header() {
  return (
    <nav className="bg-green-700 flex justify-end p-2">
      <AuthenticationLink />
    </nav>
  );
}
