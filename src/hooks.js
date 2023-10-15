import { useLayoutEffect, useRef, useState } from 'react';

export function useBoundingClientRect() {
  const ref = useRef(null);
  const [rect, setRect] = useState(null);
  useLayoutEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}
