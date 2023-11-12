import { useEffect } from 'react'
import SettingsModal from './components/SettingsModal'
import Tabs from './components/Tabs'
import Logo from './assets/logo.svg?react'
import useAppStore from './data/useAppStore'

export default function App() {
  const themeColor = useAppStore((s) => s.settings.color)
  const fontFamily = useAppStore((s) => s.settings.font)

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', themeColor)
    document.documentElement.style.setProperty('font-family', fontFamily)
  }, [themeColor, fontFamily])

  return (
    <main className="flex min-h-[100svh] flex-col items-center gap-11 bg-background px-6 py-8 dark">
      <h1>
        <Logo aria-label="pomodoro app" role="img" className="m-auto h-6" />
      </h1>
      <Tabs />
      <SettingsModal />
    </main>
  )
}
