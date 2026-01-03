import Slide from './Slide'

export default function BackgroundsSlide({ isNested }: { isNested?: boolean }) {
  return (
    <Slide isNested={isNested} isVertical>
      <section data-background="#4d7e65">
        <h2>Slide Backgrounds</h2>
        <p>Use data-background on sections to change colors</p>
        <aside className="notes">
          Backgrounds can be colors, gradients, images, videos, or iframes.
          Use data-background-transition to animate between them.
        </aside>
      </section>
      <section data-background="#b5533c">
        <h2>Autumn Vibes</h2>
        <p>Any CSS color works</p>
      </section>
      <section data-background-gradient="linear-gradient(to right, #e66465, #9198e5)">
        <h2>Gradient Backgrounds</h2>
        <p style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          Linear and radial gradients supported
        </p>
      </section>
      <section data-background="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920" data-background-size="cover">
        <h2 style={{
          textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
          background: 'rgba(0,0,0,0.5)',
          padding: '0.5em 1em',
          borderRadius: '8px',
          display: 'inline-block'
        }}>
          Image Backgrounds
        </h2>
        <aside className="notes">
          Images load from any URL. Use data-background-size and data-background-position for control.
        </aside>
      </section>
      <section data-background-color="#000" data-background-iframe="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&mute=1" data-background-interactive>
        <h2 style={{
          background: 'rgba(0,0,0,0.8)',
          padding: '0.5em 1em',
          borderRadius: '8px',
          position: 'relative',
          zIndex: 1
        }}>
          Video Backgrounds
        </h2>
        <p style={{
          background: 'rgba(0,0,0,0.7)',
          padding: '0.3em 0.6em',
          borderRadius: '4px',
          fontSize: '0.7em'
        }}>
          Embed videos or any iframe content
        </p>
        <aside className="notes">
          data-background-interactive makes the iframe clickable.
          Great for live demos or interactive content behind your slides.
        </aside>
      </section>
    </Slide>
  )
}
