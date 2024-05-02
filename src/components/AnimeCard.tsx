import { useState } from 'react';
import clsx from 'clsx';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { Anime } from '../types';
import IncrementPanel from './IncrementPanel';
import TitlePanel from './TitlePanel';
import { measureWidth } from '../hooks';
import DateLabel from './DateLabel';

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

  const [flexWidth, flexRef] = measureWidth<HTMLDivElement>([isHovering]);

  return (
    <div
      className="absolute"
      style={{
        // This defines where the upper left corner of the image will be
        left: `${left}px`,
        top: `-${yOffset}px`,
      }}
    >
      <div
        className={clsx([
          'relative', // positioning ancestor for TitlePanel
        ])}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        {isHovering && <TitlePanel anime={anime} width={flexWidth} />}
        <div
          className="flex"
          ref={flexRef}
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
      </div>
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
