import clsx from 'clsx';
import { ReactNode } from 'react';

interface ButtonProps {
  className?: string;
  children?: ReactNode;
}
export default function Button({ className, children }: ButtonProps) {

  return (
    <button className={clsx([
      'bg-primary text-white px-1 text-sm',
      className,
    ])}>
      {children}
    </button>
  );
}
