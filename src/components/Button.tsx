import clsx from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
  colors?: string;
  className?: string;
  children?: ReactNode;
}
export default function Button({ colors, className, children }: ButtonProps) {
  return (
    <button className={clsx([
      'bg-primary text-white px-1 text-sm',
      colors || 'bg-primary hover:bg-primaryLight',
      className,
    ])}>
      {children}
    </button>
  );
}
