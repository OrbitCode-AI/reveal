import { useEffect, useRef, useState } from 'preact/hooks';
import Reveal from 'reveal.js';

// 1. Inject hiding CSS FIRST (before any other CSS loads) at module scope
const hideStyleId = 'reveal-hide';
if (!document.getElementById(hideStyleId)) {
  const hideStyle = document.createElement('style');
  hideStyle.id = hideStyleId;
  hideStyle.textContent = `
    .reveal { visibility: hidden !important; }
    .reveal *, .reveal *::before, .reveal *::after {
      transition: none !important;
      animation: none !important;
    }
  `;
  document.head.appendChild(hideStyle);
}

// 2. Now import CSS - these get injected AFTER the hiding CSS
import './css/reveal.css';
import './css/themes/black.css';
import './css/monokai.css';

// 3. Import slide components (in presentation order)
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

// 4. Add a dynamic theme link for theme switching (loads on top of base theme)
const themeLinkId = 'reveal-theme-dynamic';
if (!document.getElementById(themeLinkId)) {
  const themeLink = document.createElement('link');
  themeLink.id = themeLinkId;
  themeLink.rel = 'stylesheet';
  // Start empty - base theme from import is used initially
  document.head.appendChild(themeLink);
}

export default function App() {
  const deckDivRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deckRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!deckDivRef.current) return;
    const doc = deckDivRef.current.ownerDocument;
    const hideStyle = doc.getElementById(hideStyleId);

    // Load plugins from CDN
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const script = doc.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        doc.head.appendChild(script);
      });
    };

    // Wait for plugins to load, then initialize
    Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/plugin/highlight/highlight.js'),
      loadScript('https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/plugin/notes/notes.js'),
      loadScript('https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/plugin/zoom/zoom.js'),
    ]).then(() => {
      // Prevent double initialization
      if (deckRef.current) return;

      const container = deckDivRef.current!;

      // Wait for container to have stable dimensions before initializing
      const waitForDimensions = () => {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          initReveal();
        } else {
          requestAnimationFrame(waitForDimensions);
        }
      };

      const initReveal = () => {
        if (deckRef.current) return;

        // @ts-ignore - plugins are loaded globally
        const plugins = [window.RevealHighlight, window.RevealNotes, window.RevealZoom].filter(Boolean);

        deckRef.current = new Reveal(container, {
          transition: 'slide',
          embedded: true,
          plugins,
        });

        deckRef.current.initialize().then(() => {
          // Force layout recalculation to fix any sizing issues
          deckRef.current.layout();

          // Set up ResizeObserver to handle container resize
          resizeObserverRef.current = new ResizeObserver(() => {
            if (deckRef.current) {
              deckRef.current.layout();
            }
          });
          resizeObserverRef.current.observe(container);

          // Remove the hide style to show everything
          if (hideStyle) hideStyle.remove();
          setReady(true);
        });
      };

      requestAnimationFrame(waitForDimensions);
    });

    return () => {
      if (hideStyle) hideStyle.remove();
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn('Reveal.js destroy call failed.');
      }
    };
  }, []);

  // Theme switcher - loads theme from local files
  const setTheme = (theme: string) => {
    const themeLink = document.getElementById(themeLinkId) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `./css/themes/${theme}.css`;
    }
  };

  return (
    <div className="reveal" ref={deckDivRef} style={{ position: 'fixed', inset: 0 }}>
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
