import React, { useState } from 'react';
import clsx from 'clsx';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { Anime } from '../types';
import IncrementPanel from './IncrementPanel';

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

  const imageCenter = position.x;
  const left = imageCenter - imageOffset;

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseOver = () => setIsHovering(true);
  const handleMouseOut = () => setIsHovering(false);

  return (
    <div
      className="absolute flex"
      style={{
        left: `${left}px`,
        top: `-${yOffset}px`,
      }}
    >
      <div
        className="flex"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <img
          src={anime.node.main_picture.medium}
          width={IMAGE_WIDTH}
          className={clsx([
            'z-10 inline',
            'border border-black',
            'max-w-none',
          ])}
          style={{
            height: IMAGE_HEIGHT,
          }}
          alt=""
        />
        {isHovering && <IncrementPanel anime={anime} />}
      </div>
      <span
        className={clsx([
          'absolute z-0',
          'border-black',
        ])}
        style={{
          height: tickHeight,
          ['border-left-width' as string]: `${tickWidth}px`,
          left: imageOffset,
          top: IMAGE_HEIGHT,
        }}
      />
    </div>
  );
}
