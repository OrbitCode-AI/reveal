import Reveal from 'reveal.js'
import { useEffect, useRef } from 'preact/hooks'
import type { RefObject, ComponentChildren } from 'preact'

// CSS imports for standalone slide previews
import '../css/reveal.css'
import '../css/themes/black.css'
import '../css/monokai.css'

const CDN_BASE = 'https://cdn.jsdelivr.net/npm/reveal.js@5.1.0'

// Inject CSS to hide reveal until ready (prevents FOUC)
const hideStyleId = 'reveal-hide'
if (!document.getElementById(hideStyleId)) {
  const style = document.createElement('style')
  style.id = hideStyleId
  style.textContent = `
    .reveal { visibility: hidden !important; }
    .reveal *, .reveal *::before, .reveal *::after {
      transition: none !important;
      animation: none !important;
    }
  `
  document.head.appendChild(style)
}

// Dynamic theme link for runtime switching
const themeLinkId = 'reveal-theme-dynamic'

function getOrCreateThemeLink(): HTMLLinkElement {
  let link = document.getElementById(themeLinkId) as HTMLLinkElement
  if (!link) {
    link = document.createElement('link')
    link.id = themeLinkId
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  return link
}

/**
 * Load reveal.js plugins from CDN
 */
export function loadPlugins(plugins: string[]): Promise<void[]> {
  const loadScript = (name: string): Promise<void> => {
    return new Promise(resolve => {
      const script = document.createElement('script')
      script.src = `${CDN_BASE}/plugin/${name}/${name}.js`
      script.onload = () => resolve()
      document.head.appendChild(script)
    })
  }
  return Promise.all(plugins.map(loadScript))
}

/**
 * Switch theme at runtime (loads from CDN)
 */
export function setTheme(theme: string): void {
  const link = getOrCreateThemeLink()
  link.href = `${CDN_BASE}/dist/theme/${theme}.css`
}

/**
 * Get loaded plugins from window globals
 */
function getPlugins(): unknown[] {
  // @ts-ignore - plugins register themselves globally
  return [window.RevealHighlight, window.RevealNotes, window.RevealZoom].filter(Boolean)
}

export interface RevealConfig {
  transition?: string
  embedded?: boolean
}

export interface RevealInstance {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deck: any
  destroy: () => void
}

/**
 * Initialize Reveal.js on a container element
 */
export function start(container: HTMLElement, config: RevealConfig = {}): Promise<RevealInstance> {
  return new Promise(resolve => {
    const waitForDimensions = () => {
      const rect = container.getBoundingClientRect()
      if (rect.width > 0 && rect.height > 0) {
        init()
      } else {
        requestAnimationFrame(waitForDimensions)
      }
    }

    const init = () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const deck = new (Reveal as any)(container, {
        transition: config.transition || 'slide',
        embedded: config.embedded ?? true,
        plugins: getPlugins(),
      })

      let resizeObserver: ResizeObserver | null = null

      deck.initialize().then(() => {
        deck.layout()

        // Handle container resize
        resizeObserver = new ResizeObserver(() => deck.layout())
        resizeObserver.observe(container)

        // Show the presentation
        const hideStyle = document.getElementById(hideStyleId)
        if (hideStyle) hideStyle.remove()

        resolve({
          deck,
          destroy: () => {
            resizeObserver?.disconnect()
            try {
              deck.destroy()
            } catch (_e) {
              console.warn('Reveal.js destroy failed')
            }
          },
        })
      })
    }

    requestAnimationFrame(waitForDimensions)
  })
}

export interface UseRevealOptions {
  plugins?: string[]
  transition?: string
}

/**
 * Hook to initialize Reveal.js on a container ref
 */
export function useReveal(options: UseRevealOptions = {}): RefObject<HTMLDivElement> {
  const { plugins = ['highlight', 'notes', 'zoom'], transition = 'slide' } = options
  const deckRef = useRef<HTMLDivElement>(null)
  const destroyRef = useRef<(() => void) | null>(null)

  useEffect(() => {
    if (!deckRef.current) return

    loadPlugins(plugins).then(() => {
      if (!deckRef.current || destroyRef.current) return

      start(deckRef.current, { transition }).then(({ destroy }) => {
        destroyRef.current = destroy
      })
    })

    return () => {
      destroyRef.current?.()
      destroyRef.current = null
    }
  }, [plugins, transition])

  return deckRef
}

/**
 * Standalone deck wrapper
 */
export function Deck({ children }: { children: ComponentChildren }) {
  const deckRef = useReveal()

  return (
    <div className="reveal" ref={deckRef} style={{ position: 'fixed', inset: 0 }}>
      <div className="slides">{children}</div>
    </div>
  )
}

export default function App() {
  return (
    <Deck>
      <section>
        <h1>Hello, Reveal.js</h1>
        <p>Press arrow keys to navigate</p>
      </section>
      <section>
        <h2>Slide 2</h2>
        <p>This is a minimal example</p>
      </section>
    </Deck>
  )
}
