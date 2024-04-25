import clsx from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
  onClick?: () => void;
  colors?: string;
  className?: string;
  children?: ReactNode;
}
export default function Button({ onClick, colors, className, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx([
        'px-1 text-sm border',
        colors || 'border-primary hover:bg-primaryLight hover:text-white',
        className,
      ])}>
      {children}
    </button>
  );
}
