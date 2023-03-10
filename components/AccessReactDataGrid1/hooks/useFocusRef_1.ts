import { useRef, useLayoutEffect } from 'react';

export function useFocusRef<T extends HTMLOrSVGElement>(
  isCellSelected: boolean | undefined
) {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    if (!isCellSelected) return;
    if (ref?.current?.focus) {
      ref?.current?.focus({ preventScroll: true });
    }
  }, [isCellSelected]);

  return ref;
}
