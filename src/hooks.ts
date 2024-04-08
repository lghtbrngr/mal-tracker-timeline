import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

export function useBoundingClientRect<T extends HTMLElement>(): [DOMRect | null, RefObject<T>] {
  const ref = useRef<T>(null);
  const [rect, setRect] = useState<DOMRect | null>(null);
  useLayoutEffect(() => {
    if (ref.current) {
      setRect(ref.current.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
}

export function measure<T extends HTMLElement>(
  dim: 'width' | 'height',
  deps: React.DependencyList = [],
): [number, RefObject<T>] {

  const ref = useRef<T>(null);
  const [value, setValue] = useState<number>(0);
  useLayoutEffect(() => {
    const rect = ref.current?.getBoundingClientRect();
    console.log('calling useLayoutEffect()');
    if (rect) {
      console.log(rect?.[dim]);
      setValue(rect?.[dim] || 0);
    }
  }, deps);
  return [value, ref];
}

export function measureHeight<T extends HTMLElement>(deps: React.DependencyList = []) {
  return measure<T>('height', deps);
}

export function measureWidth<T extends HTMLElement>(deps: React.DependencyList = []) {
  return measure<T>('width', deps);
}

/* Call a function exactly once after a component is mounted.
 * Bypasses react dev mode double-rendering.
 * Useful for things like api calls that alter state.
 */
export function callOnce(func: () => any) {
  const isCalled = useRef(false);
  useEffect(() => {
    if (!isCalled.current) {
      isCalled.current = true;
      func();
    }
  }, []);
}
