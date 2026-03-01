import { Deck, setTheme } from '../lib/reveal'

interface ThemesSlideProps {
  setTheme: (theme: string) => void
}

const themeButtonStyle = {
  background: 'none',
  border: 'none',
  color: 'inherit',
  textDecoration: 'underline',
  cursor: 'pointer',
  font: 'inherit',
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

function ThemeButton({ theme, label }: { theme: string; label?: string }) {
  return (
    <button type="button" style={themeButtonStyle} onClick={() => setTheme(theme)}>
      {label ?? capitalize(theme)}
    </button>
  )
}

export function Themes({ setTheme: _setTheme }: ThemesSlideProps) {
  return (
    <section id="themes">
      <h2>Themes</h2>
      <p>reveal.js comes with a few themes built in:</p>
      <p>
        <ThemeButton theme="black" label="Black (default)" /> - <ThemeButton theme="white" /> -{' '}
        <ThemeButton theme="league" /> - <ThemeButton theme="sky" /> - <ThemeButton theme="beige" />{' '}
        - <ThemeButton theme="simple" />
      </p>
      <p>
        <ThemeButton theme="serif" /> - <ThemeButton theme="blood" /> -{' '}
        <ThemeButton theme="night" /> - <ThemeButton theme="moon" /> -{' '}
        <ThemeButton theme="solarized" />
      </p>
    </section>
  )
}

export default function () {
  return (
    <Deck>
      <Themes setTheme={setTheme} />
    </Deck>
  )
}
