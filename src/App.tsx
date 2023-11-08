import CountdownTimer from './components/CountdownTimer'
import Tabs from './components/Tabs'

export default function App() {
  return (
    <div className="bg-background font-sans dark">
      <h1 className="font-sans font-bold text-sunset">This is Kumbh Sans</h1>
      <h2 className="font-serif text-whisper">This is Roboto Slab</h2>
      <h3 className="font-mono text-orchid">This is Space Mono</h3>
      <Tabs />
      <CountdownTimer />
    </div>
  )
}
