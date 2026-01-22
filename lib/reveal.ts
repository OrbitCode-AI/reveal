import Reveal from 'reveal.js';

const CDN_BASE = 'https://cdn.jsdelivr.net/npm/reveal.js@5.1.0';

// Inject CSS to hide reveal until ready (prevents FOUC)
const hideStyleId = 'reveal-hide';
if (!document.getElementById(hideStyleId)) {
  const style = document.createElement('style');
  style.id = hideStyleId;
  style.textContent = `
    .reveal { visibility: hidden !important; }
    .reveal *, .reveal *::before, .reveal *::after {
      transition: none !important;
      animation: none !important;
    }
  `;
  document.head.appendChild(style);
}

// Dynamic theme link for runtime switching
const themeLinkId = 'reveal-theme-dynamic';

function getOrCreateThemeLink(): HTMLLinkElement {
  let link = document.getElementById(themeLinkId) as HTMLLinkElement;
  if (!link) {
    link = document.createElement('link');
    link.id = themeLinkId;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  return link;
}

/**
 * Load reveal.js plugins from CDN
 */
export function loadPlugins(plugins: string[]): Promise<void[]> {
  const loadScript = (name: string): Promise<void> => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = `${CDN_BASE}/plugin/${name}/${name}.js`;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  };
  return Promise.all(plugins.map(loadScript));
}

/**
 * Switch theme at runtime (loads from CDN)
 */
export function setTheme(theme: string): void {
  const link = getOrCreateThemeLink();
  link.href = `${CDN_BASE}/dist/theme/${theme}.css`;
}

/**
 * Get loaded plugins from window globals
 */
function getPlugins(): unknown[] {
  // @ts-ignore - plugins register themselves globally
  return [window.RevealHighlight, window.RevealNotes, window.RevealZoom].filter(Boolean);
}

export interface RevealConfig {
  transition?: string;
  embedded?: boolean;
}

export interface RevealInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deck: any;
  destroy: () => void;
}

/**
 * Initialize Reveal.js on a container element
 */
export function start(
  container: HTMLElement,
  config: RevealConfig = {}
): Promise<RevealInstance> {
  return new Promise((resolve) => {
    const waitForDimensions = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        init();
      } else {
        requestAnimationFrame(waitForDimensions);
      }
    };

    const init = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deck = new (Reveal as any)(container, {
        transition: config.transition || 'slide',
        embedded: config.embedded ?? true,
        plugins: getPlugins(),
      });

      let resizeObserver: ResizeObserver | null = null;

      deck.initialize().then(() => {
        deck.layout();

        // Handle container resize
        resizeObserver = new ResizeObserver(() => deck.layout());
        resizeObserver.observe(container);

        // Show the presentation
        const hideStyle = document.getElementById(hideStyleId);
        if (hideStyle) hideStyle.remove();

        resolve({
          deck,
          destroy: () => {
            resizeObserver?.disconnect();
            try {
              deck.destroy();
            } catch (e) {
              console.warn('Reveal.js destroy failed');
            }
          },
        });
      });
    };

    requestAnimationFrame(waitForDimensions);
  });
}
