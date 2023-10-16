import React from 'react';
import clsx from 'clsx';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { Anime } from '../types';

const BOTTOM_PADDING = 10;
const ROW_HEIGHT = IMAGE_HEIGHT + BOTTOM_PADDING;

interface AnimeCardProps {
  anime: Anime;

  // x is in pixels and y represents a row number
  position: { x: number, y: number };
}

export default function AnimeCard({ anime, position }: AnimeCardProps) {
  const yOffset = ROW_HEIGHT * (position.y + 1);
  const tickHeight = ROW_HEIGHT * position.y + BOTTOM_PADDING;
  const tickWidth = 2;
  const imageOffset = (IMAGE_WIDTH - tickWidth) / 2;
  return (
    <div
      className="absolute"
      style={{
        left: `${position.x}px`,
        top: `-${yOffset}px`,
      }}
    >
      <img
        src={anime.node.main_picture.medium}
        width={IMAGE_WIDTH}
        className={clsx([
          'relative z-10',
          'border border-black',
          'max-w-none',
        ])}
        style={{
          left: `-${imageOffset}px`,
          height: IMAGE_HEIGHT,
        }}
        alt=""
      />
      <span
        className={clsx([
          'absolute z-0',
          `border-l-${tickWidth} border-black`,
        ])}
        style={{
          height: tickHeight,
        }}
      />
    </div>
  );
}
