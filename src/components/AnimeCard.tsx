import { useState } from 'react';
import clsx from 'clsx';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { Anime } from '../types';
import IncrementPanel from './IncrementPanel';
import TitlePanel from './TitlePanel';

interface OverlayProps {
  anime: Anime;
}

function Overlay({ anime }: OverlayProps) {
  return (
    <div className="absolute top-0">
      <TitlePanel anime={anime} />
      <div className="flex">
        <div
          style={{
            height: IMAGE_HEIGHT,
            width: IMAGE_WIDTH,
          }}
        />
        <IncrementPanel anime={anime} />
      </div>
    </div>
  );
}

interface AnimeCardProps {
  anime: Anime;
  onHoverChange?: (b: boolean) => void;
}

export default function AnimeCard({ anime, onHoverChange }: AnimeCardProps) {
  const [isHovering, setIsHovering] = useState(false);

  const handleIsHovering = (b: boolean) => {
    setIsHovering(b);
    onHoverChange && onHoverChange(b);
  };
  const handleMouseOver = () => handleIsHovering(true);
  const handleMouseOut = () => handleIsHovering(false);

  return (
    <div
      className={clsx([
        'relative', // positioning ancestor for Overlay
      ])}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <img
        src={anime.node.main_picture.medium}
        width={IMAGE_WIDTH}
        className={clsx([
          'inline relative z-10',
          'border border-black',
          'max-w-none',
        ])}
        style={{
          height: IMAGE_HEIGHT,
        }}
        alt=""
      />
      {isHovering && <Overlay anime={anime} />}
    </div>
  );
}
