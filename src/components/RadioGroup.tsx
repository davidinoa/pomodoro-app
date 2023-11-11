import { UseFormReturn } from 'react-hook-form'
import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Settings } from '../types'

type Option = {
  id: string
  value: string
  label: ReactNode
}

type RadioGroupProps<TOption extends Option> = {
  options: readonly TOption[]
  name: keyof Settings
  formMethods: UseFormReturn<Settings>
  classNames?: {
    input?: string | ((value: TOption['value']) => string)
    labelContent?: string
  }
}

export default function RadioGroup<T extends Option>({
  options,
  name,
  formMethods,
  classNames = {},
}: RadioGroupProps<T>) {
  const { register } = formMethods

  return (
    <fieldset className="flex justify-center space-x-4">
      {options.map((option) => (
        <label
          key={option.id}
          htmlFor={name}
          className="relative m-0 flex items-center"
        >
          <input
            type="radio"
            value={option.value}
            className={twMerge(
              'peer h-10 w-10 cursor-pointer appearance-none rounded-full transition duration-200 checked:border-transparent checked:bg-obsidian',
              typeof classNames.input === 'function'
                ? classNames.input(option.value)
                : classNames.input,
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
