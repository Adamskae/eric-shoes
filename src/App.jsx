import { useSmoothScroll } from './lib/useSmoothScroll'
import Nav from './components/Nav'
import Studio from './sections/Studio'
import SelectedWork from './sections/SelectedWork'
import Manifest from './sections/Manifest'
import Contact from './sections/Contact'

export default function App() {
  useSmoothScroll()

  return (
    <main className="relative bg-bone text-oxide">
      <Nav />
      <Studio />
      <SelectedWork />
      <Manifest />
      <Contact />
    </main>
  )
}
