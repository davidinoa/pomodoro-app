import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { Settings } from '../types/types'

type AppState = {
  settings: Settings
  setSettings: (settings: Settings) => void
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      settings: {
        pomodoroTime: 25,
        shortBreakTime: 5,
        longBreakTime: 15,
        font: 'Kumbh Sans',
        color: '#f87070',
      },
      setSettings: (settings) => set({ settings }),
    }),
    {
      name: 'pomodoro-app-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export default useAppStore
