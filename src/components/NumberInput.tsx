import { Button } from '@nextui-org/react'
import { ComponentProps } from 'react'
import { UseFormReturn } from 'react-hook-form'
import ArrowUpIcon from '../assets/icon-arrow-up.svg?react'
import ArrowDownIcon from '../assets/icon-arrow-down.svg?react'
import { Settings } from '../types/types'

type NumberInputProps = {
  label: string
  name: keyof Settings
  formMethods: UseFormReturn<Settings>
} & ComponentProps<'input'>

export default function NumberInput({
  label,
  name,
  formMethods,
}: NumberInputProps) {
  const { register, getValues, setValue, watch } = formMethods
  const currentValue = watch(name)

  function coerceInputValue(value: number, minValue = 1, maxValue = 99) {
    if (Number.isNaN(value) || value < minValue) return minValue
    if (value > maxValue) return maxValue
    return value
  }

  function handleArrowClick(action: 'increment' | 'decrement') {
    const inputValue = Number(getValues(name))
    switch (action) {
      case 'increment':
        return setValue(name, coerceInputValue(inputValue + 1))
      case 'decrement':
        return setValue(name, coerceInputValue(inputValue - 1))
      default:
        throw new Error('Invalid action')
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    const inputValue = e.target.valueAsNumber
    setValue(name, coerceInputValue(inputValue))
  }

  return (
    <label
      htmlFor="pomodoroTime"
      className="flex items-center justify-between font-bold md:flex-col"
    >
      <span className="text-xs opacity-40">{label}</span>
      <div className="relative">
        <input
          type="number"
          className="input-number w-36 rounded bg-whisper p-3 text-base leading-none text-eclipse"
          {...register(name, { valueAsNumber: true })}
          onBlur={handleBlur}
        />
        <Button
          tabIndex={-1}
          isIconOnly
          variant="light"
          className="absolute right-1 top-1 h-4 w-fit opacity-100 hover:bg-purple-400 disabled:opacity-30"
          disabled={currentValue === 99}
          onClick={() => handleArrowClick('increment')}
        >
          <ArrowUpIcon />
        </Button>
        <Button
          tabIndex={-1}
          isIconOnly
          variant="light"
          className="absolute bottom-1 right-1 h-4 w-fit opacity-100 disabled:opacity-30"
          disabled={currentValue === 1}
          onClick={() => handleArrowClick('decrement')}
        >
          <ArrowDownIcon />
        </Button>
      </div>
    </label>
  )
}
