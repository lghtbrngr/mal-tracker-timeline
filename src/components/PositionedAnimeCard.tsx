import clsx from 'clsx';
import { useState } from 'react';
import { ANIME_CARD_BOTTOM_PADDING, IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { Anime } from '../types';
import DateLabel from './DateLabel';
import AnimeCard from './AnimeCard';

const ROW_HEIGHT = IMAGE_HEIGHT + ANIME_CARD_BOTTOM_PADDING;

interface PositionedAnimeCardProps {
  anime: Anime;

  // x is in pixels and y represents a row number
  position: { x: number, y: number };
}

export default function PositionedAnimeCard({ anime, position }: PositionedAnimeCardProps) {
  const yOffset = ROW_HEIGHT * (position.y + 1);
  const tickHeight = ROW_HEIGHT * position.y + ANIME_CARD_BOTTOM_PADDING;
  const tickWidth = 2;
  const imageOffset = (IMAGE_WIDTH - tickWidth) / 2;

  const imageCenter = position.x;
  const left = imageCenter - imageOffset;

  const [isHovering, setIsHovering] = useState(false);
  const handleHoverChange = (b: boolean) => setIsHovering(b);

  return (
    <div
      className="absolute"
      style={{
        // This defines where the upper left corner of the image will be
        left: `${left}px`,
        top: `-${yOffset}px`,
      }}
    >
      <AnimeCard anime={anime} onHoverChange={handleHoverChange} />
      <div
        className={clsx([
          'absolute',
          'border-black',
        ])}
        style={{
          height: tickHeight,
          borderLeftWidth: `${tickWidth}px`,
          left: imageOffset,
          top: IMAGE_HEIGHT,
        }}
      >
        {isHovering && <DateLabel anime={anime} top={tickHeight} />}
      </div>
    </div>
  );
}
