export function AutoAnimate() {
  return (
    <>
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
    </>
  );
}
