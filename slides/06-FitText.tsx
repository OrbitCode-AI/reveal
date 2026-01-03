import Slide from './Slide'

export default function FitTextSlide({ isNested }: { isNested?: boolean }) {
  return (
    <Slide isNested={isNested}>
      <section data-transition="zoom">
        <h2 className="r-fit-text">FIT TEXT</h2>
        <h2 className="r-fit-text" style={{ color: '#42affa' }}>SCALES</h2>
        <h2 className="r-fit-text" style={{ color: '#7ee787' }}>AUTOMATICALLY</h2>
        <aside className="notes">
          r-fit-text class automatically scales text to fit the slide width.
          Great for impactful headlines and key statements.
        </aside>
      </section>
    </Slide>
  )
}
