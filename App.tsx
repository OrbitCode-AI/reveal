import { useEffect, useRef, useState } from 'preact/hooks'
import Reveal from 'reveal.js'
import RevealNotes from 'reveal.js/plugin/notes/notes'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/dist/theme/black.css'

// Import individual slide components
import TitleSlide from './slides/01-Title'
import VerticalSlides from './slides/02-Vertical'
import CodeSlide from './slides/03-Code'
import FragmentsSlide from './slides/04-Fragments'
import BackgroundsSlide from './slides/05-Backgrounds'
import FitTextSlide from './slides/06-FitText'
import ClosingSlide from './slides/07-Closing'

export default function App() {
  const deckRef = useRef(null)
  const revealRef = useRef(null)
  const ignoreNextChange = useRef(false)

  // Slide state: h=horizontal index, v=vertical index, f=fragment index
  // This state syncs across users via state-following
  const [slideState, setSlideState] = useState({ h: 0, v: 0, f: -1 })

  useEffect(() => {
    if (!deckRef.current) return

    const deck = new Reveal(deckRef.current, {
      controls: true,
      keyboard: true,
      hash: false,
      embedded: true,
      progress: true,
      transition: 'slide',
      backgroundTransition: 'fade',
      postMessage: true,
      postMessageEvents: true,
      plugins: [RevealNotes]
    })

    revealRef.current = deck

    // Sync Reveal.js state changes to React state
    const onSlideChanged = (event) => {
      if (ignoreNextChange.current) {
        ignoreNextChange.current = false
        return
      }
      const indices = deck.getIndices()
      setSlideState({ h: indices.h, v: indices.v, f: indices.f ?? -1 })
    }

    const onFragmentChanged = () => {
      if (ignoreNextChange.current) return
      const indices = deck.getIndices()
      setSlideState({ h: indices.h, v: indices.v, f: indices.f ?? -1 })
    }

    deck.on('slidechanged', onSlideChanged)
    deck.on('fragmentshown', onFragmentChanged)
    deck.on('fragmenthidden', onFragmentChanged)

    deck.initialize()

    return () => {
      try { deck.destroy() } catch(e) {}
    }
  }, [])

  // Sync external state changes (from followed user) back to Reveal.js
  useEffect(() => {
    const deck = revealRef.current
    if (!deck || !deck.isReady()) return

    const indices = deck.getIndices()
    const { h, v, f } = slideState

    // Only navigate if position actually changed
    if (indices.h !== h || indices.v !== v || (indices.f ?? -1) !== f) {
      ignoreNextChange.current = true
      deck.slide(h, v, f >= 0 ? f : undefined)
    }
  }, [slideState])

  return (
    <div className="reveal" ref={deckRef} style={{ position: 'fixed', inset: 0 }}>
      <div className="slides">
        <TitleSlide isNested />
        <VerticalSlides isNested />
        <CodeSlide isNested />
        <FragmentsSlide isNested />
        <BackgroundsSlide isNested />
        <FitTextSlide isNested />
        <ClosingSlide isNested />
      </div>
    </div>
  )
}
