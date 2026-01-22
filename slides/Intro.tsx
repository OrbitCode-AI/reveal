import { Deck } from '../lib/reveal';

export function Intro() {
  return (
    <>
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
    </>
  );
}

export default function () {
  return <Deck><Intro /></Deck>;
}
