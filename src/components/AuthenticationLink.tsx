import React from 'react';

const malOauthUrl = 'https://myanimelist.net/v1/oauth2/authorize'; // TODO

export default function AuthenticationLink() {
  return (
    <a className="underline" href={malOauthUrl}>Authenticate</a>
  );
}
