import { Tabs as NextUiTabs, Tab } from '@nextui-org/react'
import CountdownTimer from './CountdownTimer'
import useAppStore from '../data/useAppStore'

export default function Tabs() {
  const { pomodoroTime, shortBreakTime, longBreakTime } = useAppStore(
    (state) => state.settings,
  )

  return (
    <NextUiTabs
      aria-label="Options"
      classNames={{
        cursor: 'dark:bg-theme rounded-3xl',
        tab: 'h-full py-4 px-[23px] md:px-7 rounded-[28px]',
        tabList: 'rounded-[2rem] bg-obsidian gap-0',
        tabContent:
          'group-data-[selected=true]:opacity-100 group-data-[selected=true]:text-obsidian font-bold text-xs md:text-sm leading-none text-nimbus opacity-40 transition-all',
      }}
    >
      <Tab key="pomodoro" title="pomodoro">
        <div className="w-fit">
          <CountdownTimer key={pomodoroTime} countStartMinutes={pomodoroTime} />
        </div>
      </Tab>
      <Tab key="short break" title="short break">
        <div className="w-fit">
          <CountdownTimer
            key={shortBreakTime}
            countStartMinutes={shortBreakTime}
          />
        </div>
      </Tab>
      <Tab key="long break" title="long break">
        <div className="w-fit">
          <CountdownTimer
            key={longBreakTime}
            countStartMinutes={longBreakTime}
          />
        </div>
      </Tab>
    </NextUiTabs>
  )
}
