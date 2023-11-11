import { Button } from '@nextui-org/react'
import { ComponentProps } from 'react'
import { UseFormReturn } from 'react-hook-form'
import ArrowUpIcon from '../assets/icon-arrow-up.svg?react'
import ArrowDownIcon from '../assets/icon-arrow-down.svg?react'
import { Settings } from '../types'

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

  function coerceInputValue(value: number, minValue = 1) {
    if (Number.isNaN(value) || value < minValue) return minValue
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
      className="relative flex items-center justify-between font-bold"
    >
      <span className="text-xs">{label}</span>
      <input
        type="number"
        className="input-number w-36 rounded bg-whisper p-3 text-sm leading-none text-eclipse"
        {...register(name, { valueAsNumber: true })}
        onBlur={handleBlur}
      />
      <Button
        tabIndex={-1}
        isIconOnly
        variant="light"
        className="absolute right-1 top-1.5 h-3 w-fit"
        onClick={() => handleArrowClick('increment')}
      >
        <ArrowUpIcon />
      </Button>
      <Button
        tabIndex={-1}
        isIconOnly
        variant="light"
        className="absolute bottom-1.5 right-1 h-3 w-fit opacity-100 disabled:opacity-30"
        disabled={currentValue === 1}
        onClick={() => handleArrowClick('decrement')}
      >
        <ArrowDownIcon />
      </Button>
    </label>
  )
}
