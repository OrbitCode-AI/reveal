import { useEffect, useRef } from 'preact/hooks';
import { loadPlugins, start, setTheme } from './lib/reveal';

// CSS imports
import './css/reveal.css';
import './css/themes/black.css';
import './css/monokai.css';

// Slide components (in presentation order)
import { Title } from './slides/Title';
import { Vertical } from './slides/Vertical';
import { Intro } from './slides/Intro';
import { Code } from './slides/Code';
import { PointOfView } from './slides/PointOfView';
import { AutoAnimate } from './slides/AutoAnimate';
import { Features } from './slides/Features';
import { Fragments } from './slides/Fragments';
import { Transitions } from './slides/Transitions';
import { Themes } from './slides/Themes';
import { Background } from './slides/Background';
import { Ending } from './slides/Ending';

export default function App() {
  const deckRef = useRef<HTMLDivElement>(null);
  const destroyRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!deckRef.current) return;

    loadPlugins(['highlight', 'notes', 'zoom']).then(() => {
      if (!deckRef.current || destroyRef.current) return;

      start(deckRef.current, { transition: 'slide' }).then(({ destroy }) => {
        destroyRef.current = destroy;
      });
    });

    return () => {
      destroyRef.current?.();
      destroyRef.current = null;
    };
  }, []);

  return (
    <div className="reveal" ref={deckRef} style={{ position: 'fixed', inset: 0 }}>
      <div className="slides">
        <Title />
        <Vertical />
        <Intro />
        <Code />
        <PointOfView />
        <AutoAnimate />
        <Features />
        <Fragments />
        <Transitions />
        <Themes setTheme={setTheme} />
        <Background />
        <Ending />
      </div>
    </div>
  );
}
