import { Deck } from '../lib/reveal';

export function Background() {
  return (
    <>
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
    </>
  );
}


export default function () {
  return <Deck><Background /></Deck>;
}
