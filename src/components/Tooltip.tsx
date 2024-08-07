import clsx from 'clsx';
import { ReactNode } from 'react';

interface TooltipProps {
  text: string;
  className?: string;
  children?: ReactNode;
}

export default function Tooltip({ text, className, children }: TooltipProps) {
  return (
    <div className={clsx([
      'group relative',
      className,
    ])}>
      {children}
      <span className={clsx([
        'absolute top-4 ml-2 scale-0 border border-black text-xs group-hover:scale-100',
        'bg-white z-10 whitespace-nowrap px-1',
      ])}>
        {text}
      </span>
    </div>

  );
}
