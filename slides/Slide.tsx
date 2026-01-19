import { useEffect, useRef } from 'react';
import type { ComponentChildren } from 'preact';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';

interface SlideProps {
  children: ComponentChildren;
  isNested?: boolean;
  isVertical?: boolean;
}

export default function Slide({ children, isNested, isVertical }: SlideProps) {
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNested || !deckRef.current) return;
    const container = deckRef.current;
    const deck = new Reveal(container, {
      controls: true,
      keyboard: true,
      hash: false,
      embedded: true,
      progress: true,
      transition: 'slide',
    });
    deck.initialize();

    // Recalculate layout when container resizes (fixes tiny scale on HMR)
    const resizeObserver = new ResizeObserver(() => {
      if (deck.isReady()) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (deck as any).layout();
      }
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      try {
        deck.destroy();
      } catch (e) {}
    };
  }, [isNested]);

  // When nested in App.tsx deck, just return the section(s)
  if (isNested) {
    return isVertical ? <section>{children}</section> : children;
  }

  // Standalone preview: wrap in full Reveal deck
  return (
    <div className="reveal" ref={deckRef} style={{ position: 'fixed', inset: 0 }}>
      <div className="slides">{isVertical ? <section>{children}</section> : children}</div>
    </div>
  );
}
