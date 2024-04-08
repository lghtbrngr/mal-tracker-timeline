import React from 'react';
import clsx from 'clsx';
import { Anime } from '../types';
import { measureHeight } from '../hooks';

interface TitlePanelProps {
  anime: Anime;
  width: number;
}

export default function TitlePanel({ anime, width }: TitlePanelProps) {
  console.log('rendering TitlePanel');
  console.log(`anime.node.title: ${anime.node.title}`);
  const [height, ref] = measureHeight<HTMLDivElement>([width]);
  console.log(`height: ${height}`);
  return (
    <div
      className={clsx([
        'absolute',
        'z-30',
        'border border-gray-400 border-b-0 bg-white',
        'p-1 text-xs overflow-hidden overflow-ellipsis',
      ])}
      style={{
        top: `-${height}px`,
        width,
      }}
      ref={ref}
    >
      {anime.node.title}
    </div>
  );
}
