import Slide from './Slide'

export default function FragmentsSlide({ isNested }: { isNested?: boolean }) {
  return (
    <Slide isNested={isNested}>
      <section>
        <h2>Fragment Styles</h2>
        <p>Hit the next arrow to step through...</p>
        <p className="fragment">fade-in (default)</p>
        <p className="fragment fade-out">fade-out</p>
        <p className="fragment highlight-red">highlight-red</p>
        <p className="fragment highlight-blue">highlight-blue</p>
        <p className="fragment highlight-green">highlight-green</p>
        <p><span className="fragment fade-in-then-out">fade-in-then-out</span></p>
        <p>Highlight <span className="fragment highlight-current-blue">current-blue</span></p>
        <aside className="notes">
          Fragments reveal content step by step on click/keypress.
          Multiple fragment styles: fade, highlight, grow, shrink, strike, etc.
          Use data-fragment-index to control the order.
        </aside>
      </section>
    </Slide>
  )
}
