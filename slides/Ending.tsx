import { Deck } from '../lib/reveal'

export function Ending() {
  return (
    <>
      {/* Lists */}
      <section>
        <h2>Marvelous List</h2>
        <ul>
          <li>No order here</li>
          <li>Or here</li>
          <li>Or here</li>
          <li>Or here</li>
        </ul>
      </section>

      <section>
        <h2>Fantastic Ordered List</h2>
        <ol>
          <li>One is smaller than...</li>
          <li>Two is smaller than...</li>
          <li>Three!</li>
        </ol>
      </section>

      {/* Tables */}
      <section>
        <h2>Tabular Tables</h2>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <th>Value</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Apples</td>
              <td>$1</td>
              <td>7</td>
            </tr>
            <tr>
              <td>Lemonade</td>
              <td>$2</td>
              <td>18</td>
            </tr>
            <tr>
              <td>Bread</td>
              <td>$3</td>
              <td>2</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Quotes */}
      <section>
        <h2>Clever Quotes</h2>
        <p>
          These guys come in two forms, inline:{' '}
          <q cite="http://searchservervirtualization.techtarget.com/definition/Our-Favorite-Technology-Quotations">
            The nice thing about standards is that there are so many to choose from
          </q>{' '}
          and block:
        </p>
        <blockquote cite="http://searchservervirtualization.techtarget.com/definition/Our-Favorite-Technology-Quotations">
          "For years there has been a theory that millions of monkeys typing at random on millions
          of typewriters would reproduce the entire works of Shakespeare. The Internet has proven
          this theory to be untrue."
        </blockquote>
      </section>

      {/* Links */}
      <section>
        <h2>Intergalactic Interconnections</h2>
        <p>
          You can link between slides internally, <a href="#/2/3">like this</a>.
        </p>
      </section>

      {/* Speaker view */}
      <section>
        <h2>Speaker View</h2>
        <p>
          There's a <a href="https://revealjs.com/speaker-view/">speaker view</a>. It includes a
          timer, preview of the upcoming slide as well as your speaker notes.
        </p>
        <p>
          Press the <em>S</em> key to try it out.
        </p>
        <aside className="notes">
          Oh hey, these are some notes. They'll be hidden in your presentation, but you can see them
          if you open the speaker notes window (hit 's' on your keyboard).
        </aside>
      </section>

      {/* Export to PDF */}
      <section>
        <h2>Export to PDF</h2>
        <p>
          Presentations can be <a href="https://revealjs.com/pdf-export/">exported to PDF</a>,
          here's an example:
        </p>
        <iframe
          data-src="https://www.slideshare.net/slideshow/embed_code/42840540"
          title="SlideShare presentation example"
          width="445"
          height="355"
          frameBorder="0"
          style={{ border: '3px solid #666', marginBottom: '5px', maxWidth: '100%' }}
          allowFullScreen
        />
      </section>

      {/* Global state */}
      <section>
        <h2>Global State</h2>
        <p>
          Set <code>data-state="something"</code> on a slide and <code>"something"</code> will be
          added as a class to the document element when the slide is open. This lets you apply
          broader style changes, like switching the page background.
        </p>
      </section>

      {/* State events */}
      <section data-state="customevent">
        <h2>State Events</h2>
        <p>
          Additionally custom events can be triggered on a per slide basis by binding to the{' '}
          <code>data-state</code> name.
        </p>
        <pre>
          <code
            className="javascript"
            style={{ fontSize: '18px' }}>{`Reveal.on( 'customevent', function() {
  console.log( '"customevent" has fired' );
} );`}</code>
        </pre>
      </section>

      {/* Pause */}
      <section>
        <h2>Take a Moment</h2>
        <p>
          Press B or . on your keyboard to pause the presentation. This is helpful when you're on
          stage and want to take distracting slides off the screen.
        </p>
      </section>

      {/* More features */}
      <section>
        <h2>Much more</h2>
        <ul>
          <li>Right-to-left support</li>
          <li>
            <a href="https://revealjs.com/api/">Extensive JavaScript API</a>
          </li>
          <li>
            <a href="https://revealjs.com/auto-slide/">Auto-progression</a>
          </li>
          <li>
            <a href="/?parallaxBackgroundImage=https%3A%2F%2Fs3.amazonaws.com%2Fhakim-static%2Freveal-js%2Freveal-parallax-1.jpg&parallaxBackgroundSize=2100px%20900px#/31">
              Parallax backgrounds
            </a>
          </li>
          <li>
            <a href="https://revealjs.com/keyboard/">Custom keyboard bindings</a>
          </li>
        </ul>
      </section>

      {/* End */}
      <section style={{ textAlign: 'left' }}>
        <h1>THE END</h1>
        <p>
          - <a href="https://slides.com">Try the online editor</a>
          <br />- <a href="https://github.com/hakimel/reveal.js">Source code &amp; documentation</a>
        </p>
      </section>
    </>
  )
}

export default function () {
  return (
    <Deck>
      <Ending />
    </Deck>
  )
}
