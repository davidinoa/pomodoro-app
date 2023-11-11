import CountdownTimer from './components/CountdownTimer'
import SettingsModal from './components/SettingsModal'
import Tabs from './components/Tabs'
import Logo from './assets/logo.svg?react'

export default function App() {
  return (
    <main className="flex h-[100vh] flex-col gap-11 bg-eclipse px-9 py-8 font-sans dark">
      <h1>
        <Logo aria-label="pomodoro app" role="img" className="m-auto h-6" />
      </h1>
      <Tabs />
      <div className="flex flex-col items-center justify-center">
        <CountdownTimer />
      </div>
      <SettingsModal />
    </main>
  )
}
