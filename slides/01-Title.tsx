import Slide from './Slide'

export default function TitleSlide({ isNested }) {
  return (
    <Slide isNested={isNested}>
      <section data-background-gradient="linear-gradient(to bottom, #191919, #000)">
        <h1 style={{ fontSize: '3em', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Reveal.js
        </h1>
        <h3 style={{ color: '#42affa', fontWeight: 'normal', marginTop: '0.5em' }}>
          The HTML Presentation Framework
        </h3>
        <p style={{ marginTop: '2em', fontSize: '0.6em', opacity: 0.6 }}>
          Press <kbd style={{ background: '#333', padding: '0.2em 0.5em', borderRadius: '4px' }}>→</kbd> to navigate
          &nbsp;•&nbsp;
          <kbd style={{ background: '#333', padding: '0.2em 0.5em', borderRadius: '4px' }}>↓</kbd> for vertical slides
        </p>
        <aside className="notes">
          Welcome to Reveal.js! This presentation showcases the key features.
          Press S to open speaker notes in a new window.
          Use arrow keys or swipe to navigate.
        </aside>
      </section>
    </Slide>
  )
}
