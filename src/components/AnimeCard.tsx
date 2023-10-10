import React from 'react';

interface AnimeCardProps {
  anime: Record<string, any>;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <p>{anime.title}</p>
  );
}