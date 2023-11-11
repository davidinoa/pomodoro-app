import { Button } from '@nextui-org/react'
import ArrowUpIcon from '../assets/icon-arrow-up.svg?react'
import ArrowDownIcon from '../assets/icon-arrow-down.svg?react'

export default function NumberInput() {
  return (
    <label
      htmlFor="pomodoro"
      className="relative flex items-center justify-between text-sm font-bold"
    >
      pomodoro
      <input
        name="pomodoro"
        type="number"
        className="input-number w-36 rounded bg-whisper p-3 text-eclipse"
        defaultValue={25}
      />
      <Button
        isIconOnly
        variant="light"
        className="absolute right-1 top-1.5 h-4 w-fit"
      >
        <ArrowUpIcon />
      </Button>
      <Button
        isIconOnly
        variant="light"
        className="absolute bottom-1.5 right-1 h-4 w-fit"
      >
        <ArrowDownIcon />
      </Button>
    </label>
  )
}
