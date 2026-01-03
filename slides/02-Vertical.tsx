import Slide from './Slide'

export default function VerticalSlides({ isNested }: { isNested?: boolean }) {
  return (
    <Slide isNested={isNested} isVertical>
      <section data-transition="convex">
        <h2>Vertical Slides</h2>
        <p>Slides can be nested inside of each other.</p>
        <p style={{ opacity: 0.7 }}>Use the <em>down arrow</em> to navigate ↓</p>
        <aside className="notes">
          Vertical slides let you organize content hierarchically.
          Great for diving deeper into subtopics without cluttering the main flow.
        </aside>
      </section>
      <section data-background="#2d2d2d">
        <h2>Basement Level 1</h2>
        <p>Nested slides are useful for adding detail underneath a high level topic.</p>
      </section>
      <section data-background="#1a1a2e">
        <h2>Basement Level 2</h2>
        <p>Press ↓ or ↑ to navigate between vertical slides.</p>
        <p className="fragment">This is a <strong>fragment</strong> - it appears on click!</p>
        <aside className="notes">
          Click or press space/arrow to reveal the fragment.
          Fragments are perfect for building up complex ideas step by step.
        </aside>
      </section>
      <section data-background-gradient="radial-gradient(circle, #16213e 0%, #0f0f23 100%)">
        <h2>Basement Level 3</h2>
        <p>That's it, time to go back up.</p>
        <p style={{ opacity: 0.6 }}>Press → to continue</p>
      </section>
    </Slide>
  )
}
