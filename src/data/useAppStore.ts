import { create } from 'zustand'
import { Settings } from '../types'

type AppState = {
  settings: Settings
  setSettings: (settings: Settings) => void
}

const useAppStore = create<AppState>()((set) => ({
  settings: {
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    font: 'sans',
    color: 'sunset',
  },
  setSettings: (settings) => set({ settings }),
}))

export default useAppStore
