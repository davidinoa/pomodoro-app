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
import { Settings } from '../types'
import RadioGroup from './RadioGroup'

export default function SettingsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const formMethods = useForm<Settings>({
    defaultValues: {
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
    },
  })

  const fontOptions = [
    {
      id: 'sans',
      value: 'sans',
      label: <span className="font-sans">Aa</span>,
    },
    {
      id: 'serif',
      value: 'serif',
      label: <span className="font-serif">Aa</span>,
    },
    {
      id: 'mono',
      value: 'mono',
      label: <span className="font-mono">Aa</span>,
    },
  ] as const

  return (
    <>
      <Button
        isIconOnly
        onPress={onOpen}
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
          base: 'bg-white text-eclipse max-w-[326px]',
        }}
      >
        <ModalContent className="overflow-y-visible">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl font-bold">
                <h2>Settings</h2>
              </ModalHeader>
              <Divider className="my-4" />
              <ModalBody>
                <form>
                  <h3 className="mb-5 text-center text-xs font-bold uppercase tracking-[4px]">
                    Time (Minutes)
                  </h3>
                  <div className="flex flex-col gap-2">
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
                  <Divider className="my-4" />
                  <h3 className="mb-5 text-center text-xs font-bold uppercase tracking-[4px]">
                    Font
                  </h3>
                  <RadioGroup
                    name="font"
                    options={fontOptions}
                    formMethods={formMethods}
                    classNames={{
                      input: 'bg-whisper',
                      labelContent: 'text-eclipse/70 peer-checked:text-white',
                    }}
                  />
                  <Divider className="my-4" />
                </form>
              </ModalBody>
              <ModalFooter className="absolute -bottom-10 left-1/2 z-50 -translate-x-1/2">
                <Button
                  onPress={onClose}
                  className="inline-block h-fit rounded-3xl bg-sunset px-12 py-4 text-base leading-tight"
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
