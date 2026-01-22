export function Code() {
  return (
    <>
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
    </>
  );
}
