import { useEffect, useState } from 'react'
import FontFaceObserver from 'fontfaceobserver'
import { Spinner } from '@nextui-org/react'
import SettingsModal from './components/SettingsModal'
import Tabs from './components/Tabs'
import Logo from './assets/logo.svg?react'
import useAppStore from './data/useAppStore'

const loadFonts = () => {
  const fontObservers = [
    new FontFaceObserver('Kumbh Sans'),
    new FontFaceObserver('Roboto Slab'),
    new FontFaceObserver('Space Mono'),
  ]
  return Promise.all(fontObservers.map((font) => font.load(null, 10_000)))
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const themeColor = useAppStore((s) => s.settings.color)
  const fontFamily = useAppStore((s) => s.settings.font)

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true))
  }, [])

  useEffect(() => {
    document.documentElement.style.setProperty('--theme-color', themeColor)
    document.documentElement.style.setProperty('font-family', fontFamily)
  }, [themeColor, fontFamily])

  return (
    <main className="flex min-h-[100svh] flex-col items-center gap-11 bg-background px-6 py-8 dark md:gap-14 md:p-20">
      {fontsLoaded ? (
        <>
          <h1>
            <Logo
              aria-label="Pomodoro app logo"
              className="m-auto h-6 md:h-8"
            />
          </h1>
          <Tabs />
          <SettingsModal />
        </>
      ) : (
        <div className="flex h-full grow items-center justify-center">
          <Spinner
            size="lg"
            classNames={{
              wrapper: 'w-[5rem] h-[5rem]',
              circle1: 'border-b-theme',
              circle2: 'border-b-theme',
            }}
          />
        </div>
      )}
    </main>
  )
}
