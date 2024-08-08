import { useEffect, useRef, useState } from 'react';
import useDrag from "../hooks/useDrag";
import useAppStore from '../store/AppStore';
import { toast } from 'react-hot-toast';

export default function ResultViewer() {
  const searchResult = useAppStore((state) => state.searchResult);
  const popSearchResult = useAppStore((state) => state.popSearchResult);
  const addToLikedImgs = useAppStore((state) => state.addToLikedImgs);
  const addToDislikedImgs = useAppStore((state) => state.addToDislikedImgs);

  const frontImageRef = useRef<HTMLDivElement | null>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  if (!searchResult || searchResult.length === 0) {
    return <div>No results found.</div>;
  }

  function like(): void {
    addToLikedImgs(searchResult![0])
    popSearchResult()
    toast('Like!', {
      duration: 300,
      icon: '🫶',
    });
    setTranslate({
      x: 0,
      y: 0
    });
  }

  function dislike(): void {
    addToDislikedImgs(searchResult![0]);
    popSearchResult();
    toast('Dislike!', {
      duration: 300,
      icon: '😨',
    });
    setTranslate({
      x: 0,
      y: 0
    });

  }

  const handleDrag = (e: PointerEvent) => {
    console.log("translate", translate.x)
    setTranslate({
      x: translate.x + e.movementX,
      y: translate.y + e.movementY
    });
  };

  const handlePointerUp = () => {
    if (translate.x > 0) like()
    if (translate.x < 0) dislike()
  }

  useDrag(frontImageRef, [translate], {
    onDrag: handleDrag,
    onPointerUp: handlePointerUp
  });

  useArrowKeyListener((event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') dislike()
    if (event.key === 'ArrowRight') like()
  }, ['ArrowLeft', 'ArrowRight']);

  return (
    <div className="flex-1 relative">
      {searchResult.slice(0, 6).map((result: any, index: number) => {
        const translateX = index * 5;
        const translateY = index * 5;
        return (
          <div
            key={index}
            ref={index === 0 ? frontImageRef : null}
            className="absolute left-1/2 top-1/2 rounded-xl"
            style={{
              width: '90%',
              height: '95%',
              transform: `translate(-50%, -55%) translate(${translateX + (index === 0 ? translate.x : 0)}px, ${translateY}px)`,
              overflow: 'hidden',
              opacity: Math.max(0, 1 - index * 0.1),
              zIndex: searchResult.length - index
            }}
          >
            <img
              src={result.original}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                pointerEvents: 'none'
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

function useArrowKeyListener(callback: (event: KeyboardEvent) => void, keys: string[]) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (keys.includes(event.key)) {
        callback(event);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callback, keys]);
}
