import { create } from 'zustand'
import { Settings } from '../types/types'

type AppState = {
  settings: Settings
  setSettings: (settings: Settings) => void
}

const useAppStore = create<AppState>()((set) => ({
  settings: {
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    font: 'Kumbh Sans',
    color: '#f87070',
  },
  setSettings: (settings) => set({ settings }),
}))

export default useAppStore
