export function Fragments() {
  return (
    <section>
      <section id="fragments">
        <h2>Fragments</h2>
        <p>Hit the next arrow...</p>
        <p className="fragment">... to step through ...</p>
        <p>
          <span className="fragment">... a</span>{' '}
          <span className="fragment">fragmented</span>{' '}
          <span className="fragment">slide.</span>
        </p>
        <aside className="notes">
          This slide has fragments which are also stepped through in the notes window.
        </aside>
      </section>
      <section>
        <h2>Fragment Styles</h2>
        <p>There's different types of fragments, like:</p>
        <p className="fragment grow">grow</p>
        <p className="fragment shrink">shrink</p>
        <p className="fragment fade-out">fade-out</p>
        <p>
          <span style={{ display: 'inline-block' }} className="fragment fade-right">fade-right, </span>
          <span style={{ display: 'inline-block' }} className="fragment fade-up">up, </span>
          <span style={{ display: 'inline-block' }} className="fragment fade-down">down, </span>
          <span style={{ display: 'inline-block' }} className="fragment fade-left">left</span>
        </p>
        <p className="fragment fade-in-then-out">fade-in-then-out</p>
        <p className="fragment fade-in-then-semi-out">fade-in-then-semi-out</p>
        <p>
          Highlight <span className="fragment highlight-red">red</span>{' '}
          <span className="fragment highlight-blue">blue</span>{' '}
          <span className="fragment highlight-green">green</span>
        </p>
      </section>
    </section>
  );
}
