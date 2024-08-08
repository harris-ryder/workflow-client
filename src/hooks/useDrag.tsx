import { useState, useEffect, RefObject } from 'react';

interface UseDragOptions {
  onPointerDown?: (e: PointerEvent) => void;
  onPointerUp?: (e: PointerEvent) => void;
  onPointerMove?: (e: PointerEvent) => void;
  onDrag?: (e: PointerEvent) => void;
}

const useDrag = (
  ref: RefObject<HTMLElement>,
  deps: any[] = [],
  options: UseDragOptions = {}
) => {
  const {
    onPointerDown = () => { },
    onPointerUp = () => { },
    onPointerMove = () => { },
    onDrag = () => { },
  } = options;

  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: PointerEvent) => {
    setIsDragging(true);
    onPointerDown(e);
  };

  const handlePointerUp = (e: PointerEvent) => {
    setIsDragging(false)
    onPointerUp(e);
  };

  const handlePointerMove = (e: PointerEvent) => {
    onPointerMove(e);
    if (isDragging) {
      onDrag(e);
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('pointerdown', handlePointerDown);
      element.addEventListener('pointerup', handlePointerUp);
      element.addEventListener('pointermove', handlePointerMove);

      return () => {
        element.removeEventListener('pointerdown', handlePointerDown);
        element.removeEventListener('pointerup', handlePointerUp);
        element.removeEventListener('pointermove', handlePointerMove);
      };
    }
  }, [deps, isDragging]);

  return { isDragging };
};

export default useDrag;
