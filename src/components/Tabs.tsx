import { Tabs, Tab, Card, CardBody } from '@nextui-org/react'
import CountdownTimer from './CountdownTimer'

export default function App() {
  return (
    <Tabs
      aria-label="Options"
      classNames={{
        cursor: 'dark:bg-sunset rounded-3xl',
        tab: 'h-full py-[18px] px-[23px] rounded-[26px]',
        tabList: 'rounded-[2rem] bg-obsidian gap-0',
        tabContent:
          'group-data-[selected=true]:opacity-100 group-data-[selected=true]:text-obsidian font-bold text-xs leading-none text-nimbus opacity-40 transition-all',
      }}
    >
      <Tab key="pomodoro" title="pomodoro">
        <div className="w-fit">
          <CountdownTimer />
        </div>
      </Tab>
      <Tab key="short break" title="short break">
        <div className="w-fit">
          <CountdownTimer />
        </div>
      </Tab>
      <Tab key="long break" title="long break">
        <div className="w-fit">
          <CountdownTimer />
        </div>
      </Tab>
    </Tabs>
  )
}
