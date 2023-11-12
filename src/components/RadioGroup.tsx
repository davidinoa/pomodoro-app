import {
  ComponentProps,
  ReactNode,
  createContext,
  useContext,
  useMemo,
} from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Settings } from '../types/types'

type RadioGroupContextValue = {
  name: keyof Settings
  formMethods: UseFormReturn<Settings>
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null)

const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext)
  if (!context) {
    throw new Error('useRadioGroupContext must be used within a RadioGroup')
  }
  return context
}

type RadioGroupProps = {
  name: keyof Settings
  formMethods: UseFormReturn<Settings>
  children: ReactNode
}

export function RadioGroup({ name, formMethods, children }: RadioGroupProps) {
  const contextValue = useMemo(
    () => ({ name, formMethods }),
    [name, formMethods],
  )

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <fieldset className="flex justify-center gap-4">{children}</fieldset>
    </RadioGroupContext.Provider>
  )
}

type RadioProps = ComponentProps<'input'> & {
  id: string
  value: string
  children: ReactNode
}

export function Radio({ id, value, className, style, children }: RadioProps) {
  const { name, formMethods } = useRadioGroupContext()
  const { register } = formMethods

  return (
    <label htmlFor={id} className="relative m-0 flex items-center">
      <input
        type="radio"
        id={id}
        value={value}
        className={`peer h-10 w-10 cursor-pointer appearance-none rounded-full transition duration-200 ${className}`}
        style={style}
        {...register(name)}
      />
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
        {children}
      </div>
    </label>
  )
}
