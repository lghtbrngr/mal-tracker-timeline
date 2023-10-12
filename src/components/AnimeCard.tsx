import React from 'react';

interface AnimeCardProps {
  anime: Record<string, any>;
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <div>
      <img src={anime.node.main_picture.medium} alt="" width="50" />
      <span>{anime.node.title}</span>
    </div>
  );
}
