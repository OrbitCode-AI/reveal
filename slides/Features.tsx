export function Features() {
  return (
    <>
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
    </>
  );
}
