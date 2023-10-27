import React, { useEffect, useRef } from 'react';
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
  if (response.status === 500) {
    console.log('completeMalAuth api returned an error');
  }
}

export default function MalAuthAllowed() {
  const [queryParams] = useSearchParams();
  const calledApi = useRef(false);
  useEffect(() => {
    const authCode = queryParams.get('code');
    if (authCode && !calledApi.current) {
      console.log('calling api completeMalAuth');
      completeMalAuth(authCode);
      calledApi.current = true;
    }
  }, [calledApi]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <p>The anime tracker is now connected to your MAL account.</p>
      <p>
        <Link to="/" className="underline">Return to app</Link>
      </p>
    </div>
  );
}
