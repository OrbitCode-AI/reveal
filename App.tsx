import { useEffect, useRef, useState } from 'preact/hooks';
import Reveal from 'reveal.js';

// 1. Inject hiding CSS FIRST (before any other CSS loads) at module scope
const hideStyleId = 'reveal-hide';
if (!document.getElementById(hideStyleId)) {
  const hideStyle = document.createElement('style');
  hideStyle.id = hideStyleId;
  hideStyle.textContent = `
    .reveal { visibility: hidden !important; }
    .reveal *, .reveal *::before, .reveal *::after {
      transition: none !important;
      animation: none !important;
    }
  `;
  document.head.appendChild(hideStyle);
}

// 2. Now import CSS - these get injected AFTER the hiding CSS
import './css/reveal.css';
import './css/theme-black.css';
import './css/monokai.css';

// 3. Add a dynamic theme link for theme switching (loads on top of base theme)
const themeLinkId = 'reveal-theme-dynamic';
if (!document.getElementById(themeLinkId)) {
  const themeLink = document.createElement('link');
  themeLink.id = themeLinkId;
  themeLink.rel = 'stylesheet';
  // Start empty - base theme from import is used initially
  document.head.appendChild(themeLink);
}

export default function App() {
  const deckDivRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const deckRef = useRef<any>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!deckDivRef.current) return;
    const doc = deckDivRef.current.ownerDocument;
    const hideStyle = doc.getElementById(hideStyleId);

    // Load plugins from CDN
    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const script = doc.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        doc.head.appendChild(script);
      });
    };

    // Wait for plugins to load, then initialize
    Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/plugin/highlight/highlight.js'),
      loadScript('https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/plugin/notes/notes.js'),
      loadScript('https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/plugin/zoom/zoom.js'),
    ]).then(() => {
      // Prevent double initialization
      if (deckRef.current) return;

      const container = deckDivRef.current!;

      // Wait for container to have stable dimensions before initializing
      const waitForDimensions = () => {
        const rect = container.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          initReveal();
        } else {
          requestAnimationFrame(waitForDimensions);
        }
      };

      const initReveal = () => {
        if (deckRef.current) return;

        // @ts-ignore - plugins are loaded globally
        const plugins = [window.RevealHighlight, window.RevealNotes, window.RevealZoom].filter(Boolean);

        deckRef.current = new Reveal(container, {
          transition: 'slide',
          embedded: true,
          plugins,
        });

        deckRef.current.initialize().then(() => {
          // Force layout recalculation to fix any sizing issues
          deckRef.current.layout();

          // Set up ResizeObserver to handle container resize
          resizeObserverRef.current = new ResizeObserver(() => {
            if (deckRef.current) {
              deckRef.current.layout();
            }
          });
          resizeObserverRef.current.observe(container);

          // Remove the hide style to show everything
          if (hideStyle) hideStyle.remove();
          setReady(true);
        });
      };

      requestAnimationFrame(waitForDimensions);
    });

    return () => {
      if (hideStyle) hideStyle.remove();
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
      try {
        if (deckRef.current) {
          deckRef.current.destroy();
          deckRef.current = null;
        }
      } catch (e) {
        console.warn('Reveal.js destroy call failed.');
      }
    };
  }, []);

  // Theme switcher - loads theme from CDN, overriding the default local theme
  const setTheme = (theme: string) => {
    const themeLink = document.getElementById(themeLinkId) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = `https://cdn.jsdelivr.net/npm/reveal.js@5.1.0/dist/theme/${theme}.css`;
    }
  };

  return (
    <div className="reveal" ref={deckDivRef} style={{ position: 'fixed', inset: 0 }}>
      <div className="slides">
        {/* Title */}
        <section>
          <a href="https://revealjs.com">
            <img
              src="https://static.slid.es/reveal/logo-v1/reveal-white-text.svg"
              alt="reveal.js logo"
              style={{ height: '180px', margin: '0 auto 4rem auto', background: 'transparent' }}
              className="demo-logo"
            />
          </a>
          <h3>The HTML Presentation Framework</h3>
          <p>
            <small>
              Created by <a href="http://hakim.se">Hakim El Hattab</a> and{' '}
              <a href="https://github.com/hakimel/reveal.js/graphs/contributors">contributors</a>
            </small>
          </p>
        </section>

        {/* Intro */}
        <section>
          <h2>Hello There</h2>
          <p>
            reveal.js enables you to create beautiful interactive slide decks using HTML. This
            presentation will show you examples of what it can do.
          </p>
        </section>

        {/* Vertical slides */}
        <section>
          <section>
            <h2>Vertical Slides</h2>
            <p>Slides can be nested inside of each other.</p>
            <p>Use the <em>Space</em> key to navigate through all slides.</p>
            <br />
            <a href="#/2/1" className="navigate-down">
              <img
                className="r-frame"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                width="178"
                height="238"
                data-src="https://static.slid.es/reveal/arrow.png"
                alt="Down arrow"
              />
            </a>
          </section>
          <section>
            <h2>Basement Level 1</h2>
            <p>Nested slides are useful for adding additional detail underneath a high level horizontal slide.</p>
          </section>
          <section>
            <h2>Basement Level 2</h2>
            <p>That's it, time to go back up.</p>
            <br />
            <a href="#/2">
              <img
                className="r-frame"
                style={{ background: 'rgba(255,255,255,0.1)', transform: 'rotate(180deg)' }}
                width="178"
                height="238"
                data-src="https://static.slid.es/reveal/arrow.png"
                alt="Up arrow"
              />
            </a>
          </section>
        </section>

        {/* Slides.com */}
        <section>
          <h2>Slides</h2>
          <p>
            Not a coder? Not a problem. There's a fully-featured visual editor for authoring these,
            try it out at <a href="https://slides.com" target="_blank">https://slides.com</a>.
          </p>
        </section>

        {/* Hidden slide */}
        <section data-visibility="hidden">
          <h2>Hidden Slides</h2>
          <p>
            This slide is visible in the source, but hidden when the presentation is viewed. You can
            show all hidden slides by setting the `showHiddenSlides` config option to `true`.
          </p>
        </section>

        {/* Pretty Code */}
        <section data-auto-animate>
          <h2 data-id="code-title">Pretty Code</h2>
          <pre data-id="code-animation"><code className="hljs javascript" data-trim data-line-numbers>{`import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    ...
  );
}`}</code></pre>
          <p>Code syntax highlighting courtesy of <a href="https://highlightjs.org/usage/">highlight.js</a>.</p>
        </section>

        {/* Code with animations */}
        <section data-auto-animate>
          <h2 data-id="code-title">With Animations</h2>
          <pre data-id="code-animation"><code className="hljs javascript" data-trim data-line-numbers="|4,8-11|17|22-24">{`import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function SecondExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`}</code></pre>
        </section>

        {/* Point of View */}
        <section>
          <h2>Point of View</h2>
          <p>Press <strong>ESC</strong> to enter the slide overview.</p>
          <p>
            Hold down the <strong>alt</strong> key (<strong>ctrl</strong> in Linux) and click on any
            element to zoom towards it using <a href="http://lab.hakim.se/zoom-js">zoom.js</a>. Click
            again to zoom back out.
          </p>
          <p>(NOTE: Use ctrl + click in Linux.)</p>
        </section>

        {/* Auto-Animate boxes */}
        <section data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)">
          <h2>Auto-Animate</h2>
          <p>Automatically animate matching elements across slides with <a href="https://revealjs.com/auto-animate/">Auto-Animate</a>.</p>
          <div className="r-hstack justify-center">
            <div data-id="box1" style={{ background: '#999', width: '50px', height: '50px', margin: '10px', borderRadius: '5px' }}></div>
            <div data-id="box2" style={{ background: '#999', width: '50px', height: '50px', margin: '10px', borderRadius: '5px' }}></div>
            <div data-id="box3" style={{ background: '#999', width: '50px', height: '50px', margin: '10px', borderRadius: '5px' }}></div>
          </div>
        </section>
        <section data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)">
          <div className="r-hstack justify-center">
            <div data-id="box1" data-auto-animate-delay="0" style={{ background: 'cyan', width: '150px', height: '100px', margin: '10px' }}></div>
            <div data-id="box2" data-auto-animate-delay="0.1" style={{ background: 'magenta', width: '150px', height: '100px', margin: '10px' }}></div>
            <div data-id="box3" data-auto-animate-delay="0.2" style={{ background: 'yellow', width: '150px', height: '100px', margin: '10px' }}></div>
          </div>
          <h2 style={{ marginTop: '20px' }}>Auto-Animate</h2>
        </section>
        <section data-auto-animate data-auto-animate-easing="cubic-bezier(0.770, 0.000, 0.175, 1.000)">
          <div className="r-stack">
            <div data-id="box1" style={{ background: 'cyan', width: '300px', height: '300px', borderRadius: '50%' }}></div>
            <div data-id="box2" style={{ background: 'magenta', width: '200px', height: '200px', borderRadius: '50%' }}></div>
            <div data-id="box3" style={{ background: 'yellow', width: '100px', height: '100px', borderRadius: '50%' }}></div>
          </div>
          <h2 style={{ marginTop: '20px' }}>Auto-Animate</h2>
        </section>

        {/* Touch */}
        <section>
          <h2>Touch Optimized</h2>
          <p>
            Presentations look great on touch devices, like mobile phones and tablets. Simply swipe
            through your slides.
          </p>
        </section>

        {/* Markdown */}
        <section>
          <h2>Markdown Support</h2>
          <p>Write content using inline or external Markdown.</p>
          <p>Instructions and more info available in the <a href="https://revealjs.com/markdown/">docs</a>.</p>
          <pre><code className="hljs html">{`<section data-markdown>
  ## Markdown Support

  Write content using inline or external Markdown.
</section>`}</code></pre>
        </section>

        {/* Lightbox */}
        <section>
          <h2>Lightbox</h2>
          <p>Turn any element into a <a href="https://revealjs.com/lightbox/">lightbox</a> using <strong>data-preview-image</strong> &amp; <strong>data-preview-video</strong>.</p>
          <div className="r-hstack" style={{ gap: '2rem', justifyContent: 'center' }}>
            <div>
              <pre style={{ fontSize: '12px', width: '100%' }}><code className="html">{`<img src="image.png" data-preview-image="image.png">`}</code></pre>
              <img src="https://static.slid.es/logo/v2/slides-symbol-1024x1024.png" height="100" data-preview-image />
            </div>
            <div>
              <pre style={{ fontSize: '12px', width: '100%' }}><code className="html">{`<img src="video.png" data-preview-video="video.mp4">`}</code></pre>
              <img src="https://static.slid.es/site/homepage/v1/homepage-video-editor.png" height="100" data-preview-video="https://static.slid.es/site/homepage/v1/homepage-video-editor.mp4" />
            </div>
          </div>
        </section>

        {/* Fit text */}
        <section>
          <p>Add the <code>r-fit-text</code> class to auto-size text</p>
          <h2 className="r-fit-text">FIT TEXT</h2>
        </section>

        {/* Fragments */}
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

        {/* Transitions */}
        <section id="transitions">
          <h2>Transition Styles</h2>
          <p>
            You can select from different transitions, like:<br />
            <a href="?transition=none#/transitions">None</a> -{' '}
            <a href="?transition=fade#/transitions">Fade</a> -{' '}
            <a href="?transition=slide#/transitions">Slide</a> -{' '}
            <a href="?transition=convex#/transitions">Convex</a> -{' '}
            <a href="?transition=concave#/transitions">Concave</a> -{' '}
            <a href="?transition=zoom#/transitions">Zoom</a>
          </p>
        </section>

        {/* Themes */}
        <section id="themes">
          <h2>Themes</h2>
          <p>reveal.js comes with a few themes built in:</p>
          <p>
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('black'); }}>Black (default)</a> -{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('white'); }}>White</a> -{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('league'); }}>League</a> -{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('sky'); }}>Sky</a> -{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('beige'); }}>Beige</a> -{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('simple'); }}>Simple</a>
          </p>
          <p>
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('serif'); }}>Serif</a> -{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('blood'); }}>Blood</a> -{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('night'); }}>Night</a> -{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('moon'); }}>Moon</a> -{' '}
            <a href="#" onClick={(e) => { e.preventDefault(); setTheme('solarized'); }}>Solarized</a>
          </p>
        </section>

        {/* Backgrounds */}
        <section>
          <section data-background="#dddddd">
            <h2>Slide Backgrounds</h2>
            <p>
              Set <code>data-background="#dddddd"</code> on a slide to change the background color.
              All CSS color formats are supported.
            </p>
            <a href="#" className="navigate-down">
              <img
                className="r-frame"
                style={{ background: 'rgba(255,255,255,0.1)' }}
                width="178"
                height="238"
                data-src="https://static.slid.es/reveal/arrow.png"
                alt="Down arrow"
              />
            </a>
          </section>
          <section data-background-gradient="linear-gradient(to bottom, #283b95, #17b2c3)">
            <h2>Gradient Backgrounds</h2>
            <pre><code className="hljs html wrap">{'<section data-background-gradient="linear-gradient(to bottom, #ddd, #191919)">'}</code></pre>
          </section>
          <section data-background="https://static.slid.es/reveal/image-placeholder.png">
            <h2>Image Backgrounds</h2>
            <pre><code className="hljs html">{'<section data-background="image.png">'}</code></pre>
          </section>
          <section
            data-background="https://static.slid.es/reveal/image-placeholder.png"
            data-background-repeat="repeat"
            data-background-size="100px"
          >
            <h2>Tiled Backgrounds</h2>
            <pre><code className="hljs html" style={{ wordWrap: 'break-word' }}>
              {'<section data-background="image.png" data-background-repeat="repeat" data-background-size="100px">'}
            </code></pre>
          </section>
          <section
            data-background-video="https://static.slid.es/site/homepage/v1/homepage-video-editor.mp4"
            data-background-color="#000000"
          >
            <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', color: '#fff', padding: '20px' }}>
              <h2>Video Backgrounds</h2>
              <pre><code className="hljs html" style={{ wordWrap: 'break-word' }}>
                {'<section data-background-video="video.mp4,video.webm">'}
              </code></pre>
            </div>
          </section>
          <section data-background="http://i.giphy.com/90F8aUepslB84.gif">
            <h2>... and GIFs!</h2>
          </section>
        </section>

        {/* Background transitions */}
        <section data-transition="slide" data-background="#4d7e65" data-background-transition="zoom">
          <h2>Background Transitions</h2>
          <p>
            Different background transitions are available via the backgroundTransition option. This
            one's called "zoom".
          </p>
          <pre><code className="hljs javascript">{"Reveal.configure({ backgroundTransition: 'zoom' })"}</code></pre>
        </section>

        <section data-transition="slide" data-background="#b5533c" data-background-transition="zoom">
          <h2>Background Transitions</h2>
          <p>You can override background transitions per-slide.</p>
          <pre><code className="hljs html" style={{ wordWrap: 'break-word' }}>{'<section data-background-transition="zoom">'}</code></pre>
        </section>

        {/* Iframe background */}
        <section data-background-iframe="https://hakim.se" data-background-interactive>
          <div style={{
            position: 'absolute',
            width: '40%',
            right: 0,
            boxShadow: '0 1px 4px rgba(0,0,0,0.5), 0 5px 25px rgba(0,0,0,0.2)',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            color: '#fff',
            padding: '20px',
            fontSize: '20px',
            textAlign: 'left'
          }}>
            <h2>Iframe Backgrounds</h2>
            <p>Since reveal.js runs on the web, you can easily embed other web content. Try interacting with the page in the background.</p>
          </div>
        </section>

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
              <tr><th>Item</th><th>Value</th><th>Quantity</th></tr>
            </thead>
            <tbody>
              <tr><td>Apples</td><td>$1</td><td>7</td></tr>
              <tr><td>Lemonade</td><td>$2</td><td>18</td></tr>
              <tr><td>Bread</td><td>$3</td><td>2</td></tr>
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
          <p>You can link between slides internally, <a href="#/2/3">like this</a>.</p>
        </section>

        {/* Speaker view */}
        <section>
          <h2>Speaker View</h2>
          <p>
            There's a <a href="https://revealjs.com/speaker-view/">speaker view</a>. It includes a
            timer, preview of the upcoming slide as well as your speaker notes.
          </p>
          <p>Press the <em>S</em> key to try it out.</p>
          <aside className="notes">
            Oh hey, these are some notes. They'll be hidden in your presentation, but you can see
            them if you open the speaker notes window (hit 's' on your keyboard).
          </aside>
        </section>

        {/* Export to PDF */}
        <section>
          <h2>Export to PDF</h2>
          <p>Presentations can be <a href="https://revealjs.com/pdf-export/">exported to PDF</a>, here's an example:</p>
          <iframe
            data-src="https://www.slideshare.net/slideshow/embed_code/42840540"
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
          <pre><code className="javascript" style={{ fontSize: '18px' }}>{`Reveal.on( 'customevent', function() {
  console.log( '"customevent" has fired' );
} );`}</code></pre>
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
            <li><a href="https://revealjs.com/api/">Extensive JavaScript API</a></li>
            <li><a href="https://revealjs.com/auto-slide/">Auto-progression</a></li>
            <li><a href="/?parallaxBackgroundImage=https%3A%2F%2Fs3.amazonaws.com%2Fhakim-static%2Freveal-js%2Freveal-parallax-1.jpg&parallaxBackgroundSize=2100px%20900px#/31">Parallax backgrounds</a></li>
            <li><a href="https://revealjs.com/keyboard/">Custom keyboard bindings</a></li>
          </ul>
        </section>

        {/* End */}
        <section style={{ textAlign: 'left' }}>
          <h1>THE END</h1>
          <p>
            - <a href="https://slides.com">Try the online editor</a><br />
            - <a href="https://github.com/hakimel/reveal.js">Source code &amp; documentation</a>
          </p>
        </section>
      </div>
    </div>
  );
}
