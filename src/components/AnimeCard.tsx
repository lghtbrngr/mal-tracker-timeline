import { useState } from 'react';
import clsx from 'clsx';
import { IMAGE_HEIGHT, IMAGE_WIDTH } from '../constants';
import { Anime } from '../types';
import IncrementPanel from './IncrementPanel';
import TitlePanel from './TitlePanel';

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
        'relative', // positioning ancestor for TitlePanel
      ])}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {isHovering && <TitlePanel anime={anime} />}
      <div
        className="flex"
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
  );
}
