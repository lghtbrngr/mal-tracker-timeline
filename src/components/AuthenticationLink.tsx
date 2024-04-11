import { useEffect, useRef, useState } from 'react';

async function retrieveUrl(setUrl: any) {
  const response = await fetch('/api/authUrl');
  const url = await response.text();
  setUrl(url);
}

export default function AuthenticationLink() {
  const [url, setUrl] = useState(null);
  const calledApi = useRef(false);

  useEffect(() => {
    if (!calledApi.current) {
      calledApi.current = true;
      retrieveUrl(setUrl);
    }
  }, []);

  if (url === null) {
    return null;
  }

  return (
    <a className="underline" href={url}>Authenticate</a>
  );
}
