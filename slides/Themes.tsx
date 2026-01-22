interface ThemesSlideProps {
  setTheme: (theme: string) => void;
}

export function Themes({ setTheme }: ThemesSlideProps) {
  return (
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
  );
}
