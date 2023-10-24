import React from 'react';
import { Link } from 'react-router-dom';

export default function MalAuthAllowed() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>The app is now connected to your MAL account.</p>
      <p>
        <Link to="/" className="underline">Return to app</Link>
      </p>
    </div>
  );
}
