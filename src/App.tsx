import SettingsModal from './components/SettingsModal'
import Tabs from './components/Tabs'
import Logo from './assets/logo.svg?react'

export default function App() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center gap-11 bg-background px-6 py-8 font-sans dark">
      <h1>
        <Logo aria-label="pomodoro app" role="img" className="m-auto h-6" />
      </h1>
      <Tabs />
      <SettingsModal />
    </main>
  )
}
