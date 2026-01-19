import Slide from './Slide';

const codeExample1 = `import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}`;

const codeExample2 = `// Each slide is its own component!
function TitleSlide() {
  return (
    <section data-background="#1a1a2e">
      <h2>Hello World</h2>
      <p className="fragment">Appears on click</p>
    </section>
  )
}`;

export default function CodeSlide({ isNested }: { isNested?: boolean }) {
  return (
    <Slide isNested={isNested} isVertical>
      <section data-transition="concave" data-background="#0d1117">
        <h2 style={{ color: '#58a6ff' }}>Pretty Code</h2>
        <pre
          style={{
            textAlign: 'left',
            background: '#161b22',
            padding: '1em',
            borderRadius: '8px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}
        >
          <code style={{ color: '#c9d1d9', fontSize: '0.65em', lineHeight: '1.5' }}>
            {codeExample1}
          </code>
        </pre>
        <p style={{ marginTop: '1em', fontSize: '0.7em', opacity: 0.7 }}>
          Code syntax highlighting powered by highlight.js
        </p>
        <aside className="notes">
          Code blocks support syntax highlighting via highlight.js plugin. You can also animate code
          with line-by-line reveals.
        </aside>
      </section>
      <section data-background="#0d1117">
        <h2 style={{ color: '#58a6ff' }}>Component Architecture</h2>
        <pre
          style={{
            textAlign: 'left',
            background: '#161b22',
            padding: '1em',
            borderRadius: '8px',
          }}
        >
          <code style={{ color: '#c9d1d9', fontSize: '0.6em', lineHeight: '1.5' }}>
            {codeExample2}
          </code>
        </pre>
        <p className="fragment" style={{ marginTop: '1em', color: '#7ee787' }}>
          Edit any slide file to see live updates!
        </p>
        <aside className="notes">
          Each slide is a separate component file for maintainability. OrbitCode provides live
          preview as you edit!
        </aside>
      </section>
    </Slide>
  );
}
