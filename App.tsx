import { Deck, setTheme } from './lib/reveal'
import { Title } from './slides/Title'
import { Vertical } from './slides/Vertical'
import { Intro } from './slides/Intro'
import { Code } from './slides/Code'
import { PointOfView } from './slides/PointOfView'
import { AutoAnimate } from './slides/AutoAnimate'
import { Features } from './slides/Features'
import { Fragments } from './slides/Fragments'
import { Transitions } from './slides/Transitions'
import { Themes } from './slides/Themes'
import { Background } from './slides/Background'
import { Ending } from './slides/Ending'

export default function App() {
  return (
    <Deck>
      <Title />
      <Vertical />
      <Intro />
      <Code />
      <PointOfView />
      <AutoAnimate />
      <Features />
      <Fragments />
      <Transitions />
      <Themes setTheme={setTheme} />
      <Background />
      <Ending />
    </Deck>
  )
}
