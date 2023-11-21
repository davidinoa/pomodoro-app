import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import SettingsIcon from '../assets/icon-settings.svg?react'
import NumberInput from './NumberInput'
import { Settings } from '../types/types'
import { RadioGroup, Radio } from './RadioGroup'
import useAppStore from '../data/useAppStore'
import { colorOptions, fontOptions } from '../data/options'

export default function SettingsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { settings, setSettings } = useAppStore()

  const formMethods = useForm<Settings>({
    defaultValues: { ...settings },
  })

  function onSubmit(data: Settings) {
    setSettings(data)
  }

  return (
    <>
      <Button
        isIconOnly
        onPress={() => {
          onOpen()
          formMethods.reset(settings)
        }}
        variant="light"
        aria-label="Open settings modal"
      >
        <SettingsIcon />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
        classNames={{
          base: 'bg-white text-eclipse max-w-[326px] max-w-[33.75rem]',
        }}
      >
        <ModalContent className="overflow-y-visible">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl font-bold md:text-2xl">
                <h2>Settings</h2>
              </ModalHeader>
              <Divider className="mb-4 bg-gray-200" />
              <ModalBody className="mb-10">
                <form
                  id="settings-form"
                  onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                  <h3 className="mb-5 text-center text-xs font-bold uppercase tracking-[4px]">
                    Time (Minutes)
                  </h3>
                  <div className="flex flex-col gap-2 md:flex-row md:justify-center md:gap-5">
                    <NumberInput
                      label="pomodoro"
                      name="pomodoroTime"
                      formMethods={formMethods}
                    />
                    <NumberInput
                      label="short break"
                      name="shortBreakTime"
                      formMethods={formMethods}
                    />
                    <NumberInput
                      label="long break"
                      name="longBreakTime"
                      formMethods={formMethods}
                    />
                  </div>
                  <Divider className="my-4 bg-gray-200" />
                  <h3 className="mb-5 text-center text-xs font-bold uppercase tracking-[4px]">
                    Font
                  </h3>
                  <RadioGroup name="font" formMethods={formMethods}>
                    {fontOptions.map((option) => (
                      <Radio
                        key={option.id}
                        id={option.id}
                        value={option.value}
                        className={`font-${option.value} bg-whisper checked:bg-obsidian`}
                      >
                        <span
                          style={{ fontFamily: option.value }}
                          className={`font-bold font-${option.value} ${
                            formMethods.watch('font') === option.value
                              ? 'text-white'
                              : 'text-eclipse/70'
                          }`}
                        >
                          Aa
                        </span>
                      </Radio>
                    ))}
                  </RadioGroup>
                  <Divider className="my-4 bg-gray-200" />
                  <h3 className="mb-5 text-center text-xs font-bold uppercase tracking-[4px]">
                    Color
                  </h3>
                  <RadioGroup name="color" formMethods={formMethods}>
                    {colorOptions.map((option) => (
                      <Radio
                        key={option.id}
                        id={option.id}
                        value={option.value}
                        style={{ backgroundColor: option.value }}
                      >
                        <span
                          className={`font-bold ${
                            formMethods.watch('color') === option.value
                              ? 'block'
                              : 'hidden'
                          }`}
                        >
                          ✓
                        </span>
                      </Radio>
                    ))}
                  </RadioGroup>
                </form>
              </ModalBody>
              <ModalFooter className="absolute -bottom-10 left-1/2 z-50 -translate-x-1/2">
                <Button
                  type="submit"
                  form="settings-form"
                  onPress={onClose}
                  className="inline-block h-fit rounded-3xl bg-theme px-12 py-4 text-base font-bold leading-tight"
                  style={{ opacity: 1 }}
                >
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
