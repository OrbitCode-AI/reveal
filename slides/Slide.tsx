import { useEffect, useRef } from 'preact/hooks'
import Reveal from 'reveal.js'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'

export default function Slide({ children, isNested, isVertical }) {
  const deckRef = useRef(null)

  useEffect(() => {
    if (isNested || !deckRef.current) return
    const deck = new Reveal(deckRef.current, {
      controls: true,
      keyboard: true,
      hash: false,
      embedded: true,
      progress: true,
      transition: 'slide'
    });
    deck.initialize()
    return () => { try { deck.destroy(); } catch(e) {} }
  }, [isNested])

  // When nested in App.tsx deck, just return the section(s)
  if (isNested) {
    return isVertical ? <section>{children}</section> : children
  }

  // Standalone preview: wrap in full Reveal deck
  return (
    <div className="reveal" ref={deckRef} style={{ position: 'fixed', inset: 0 }}>
      <div className="slides">
        {isVertical ? <section>{children}</section> : children}
      </div>
    </div>
  )
}
