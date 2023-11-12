import { UseFormReturn } from 'react-hook-form'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Settings } from '../types'

type Option = {
  id: string
  value: string
  label: ReactNode
  inputBgColor?: string
}

type RadioGroupProps = {
  options: readonly Option[]
  name: keyof Settings
  formMethods: UseFormReturn<Settings>
  classNames?: {
    input?: string
    labelContent?: string
  }
}

export default function RadioGroup({
  options,
  name,
  formMethods,
  classNames = {},
}: RadioGroupProps) {
  const { register } = formMethods

  return (
    <fieldset className="flex justify-center gap-4">
      {options.map((option) => (
        <label
          key={option.id}
          htmlFor={option.id}
          className="relative m-0 flex items-center"
        >
          <input
            type="radio"
            id={option.id}
            value={option.value}
            className={twMerge(
              'peer h-10 w-10 cursor-pointer appearance-none rounded-full transition duration-200',
              option.inputBgColor ? `bg-${option.inputBgColor}` : '',
              classNames.input,
            )}
            {...register(name)}
          />
          <div
            className={twMerge(
              'pointer-events-none absolute left-1/2 -translate-x-1/2',
              classNames.labelContent,
            )}
          >
            {option.label}
          </div>
        </label>
      ))}
    </fieldset>
  )
}
