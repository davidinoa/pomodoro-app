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

export default function SettingsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const formMethods = useForm<Settings>({
    defaultValues: {
      pomodoroTime: 25,
      shortBreakTime: 5,
      longBreakTime: 15,
    },
  })

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
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-xl font-bold">
                <h2>Settings</h2>
              </ModalHeader>
              <Divider />
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
                  <Divider className="my-6" />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <Divider />
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
