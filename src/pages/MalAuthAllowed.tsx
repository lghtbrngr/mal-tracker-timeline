import React, { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

async function completeMalAuth(authCode: string) {
  const response = await fetch('/api/completeMalAuth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      authCode,
    }),
  });
  if (response.status !== 200) {
    console.log('completeMalAuth api returned an error');
  }
  return response;
}

function callOnce(f: Function) {
  const isCalled = useRef(false);
  useEffect(() => {
    if (!isCalled.current) {
      isCalled.current = true;
      f();
    }
  }, []);
}

export default function MalAuthAllowed() {
  const [status, setStatus] = useState<number | null>(null);

  const [queryParams] = useSearchParams();
  callOnce(async () => {
    const authCode = queryParams.get('code');
    if (authCode) {
      console.log('calling api completeMalAuth');
      const response = await completeMalAuth(authCode);
      setStatus(response.status);
    }
  });

  const message = (status === null && 'Authenticating...')
    || (status === 200 && 'The Anime Tracker is now connected to your MAL account.')
    || 'Authentication failed.';

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>{message}</p>
      <p>
        <Link to="/" className="underline">Return to app</Link>
      </p>
    </div>
  );
}
