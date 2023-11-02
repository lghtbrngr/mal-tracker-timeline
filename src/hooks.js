import { useEffect, useLayoutEffect, useRef, useState } from 'react';

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

/* Call a function exactly once after a component is mounted.
 * Bypasses react dev mode double-rendering.
 * Useful for things like api calls that alter state.
 */
export function callOnce(func) {
  const isCalled = useRef(false);
  useEffect(() => {
    if (!isCalled.current) {
      isCalled.current = true;
      func();
    }
  }, []);
}
