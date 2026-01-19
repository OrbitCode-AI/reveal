import Slide from './Slide';

export default function ClosingSlide({ isNested }: { isNested?: boolean }) {
  return (
    <Slide isNested={isNested}>
      <section data-background-gradient="radial-gradient(circle at center, #1a1a2e 0%, #0a0a14 100%)">
        <h1 style={{ fontSize: '3em', marginBottom: '0.5em' }}>THE END</h1>
        <h3 style={{ fontWeight: 'normal', opacity: 0.8 }}>Built with OrbitCode + Reveal.js</h3>
        <div style={{ marginTop: '2em' }}>
          <p style={{ fontSize: '0.8em' }}>
            <a href="https://revealjs.com" target="_blank" style={{ color: '#42affa' }}>
              revealjs.com
            </a>
            &nbsp;•&nbsp;
            <a
              href="https://github.com/hakimel/reveal.js"
              target="_blank"
              style={{ color: '#42affa' }}
            >
              source code
            </a>
          </p>
        </div>
        <p style={{ marginTop: '2em', fontSize: '0.6em', opacity: 0.5 }}>
          Press{' '}
          <kbd style={{ background: '#333', padding: '0.1em 0.4em', borderRadius: '4px' }}>ESC</kbd>{' '}
          for overview
        </p>
        <aside className="notes">
          Thank you for watching! ESC opens the slide overview. Check out revealjs.com for more
          plugins and customization options.
        </aside>
      </section>
    </Slide>
  );
}
