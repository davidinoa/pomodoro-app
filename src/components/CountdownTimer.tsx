import {
  ArrowUturnLeftIcon,
  PauseIcon,
  PlayIcon,
} from '@heroicons/react/24/outline'
import { CircularProgress } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import useCountdownWorker from '../useCountdownWorker'

type CountdownTimerProps = {
  countStartMinutes: number
}

type Status = 'idle' | 'running' | 'paused' | 'finished'

const startSound = new Audio('/timer-start.mp3')
const finishSound = new Audio('/timer-finish.mp3')
const pauseSound = new Audio('/timer-pause.mp3')

export default function CountdownTimer({
  countStartMinutes,
}: CountdownTimerProps) {
  const [status, setStatus] = useState<Status>('idle')
  const countStart = countStartMinutes * 60
  const { count, startCountdown, stopCountdown, resetCountdown } =
    useCountdownWorker(countStart)

  useEffect(() => {
    if (count === 0) {
      finishSound.play()
      setStatus('finished')
    }
  }, [count])

  function formatCount(currentCount: number): string {
    const minutes = Math.floor(currentCount / 60)
    const remainingSeconds = Math.floor(currentCount) % 60
    const formattedMinutes = minutes.toString().padStart(2, '0')
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0')
    return `${formattedMinutes}:${formattedSeconds}`
  }

  function wrapCountdownDigits(countdown: string) {
    let nextId = 0
    const wrappedCountdown = countdown.split('').map((char) => {
      const id = nextId
      nextId += 1
      return /\d/.test(char) ? (
        <span key={id} className="inline-block w-[1ch] text-center">
          {char}
        </span>
      ) : (
        <span key={id} className="inline-block">
          {char}
        </span>
      )
    })

    return wrappedCountdown
  }

  function handleButtonClick() {
    switch (status) {
      case 'idle':
        startSound.play()
        startCountdown()
        setStatus('running')
        break
      case 'running':
        pauseSound.play()
        stopCountdown()
        setStatus('paused')
        break
      case 'paused':
        pauseSound.play()
        startCountdown()
        setStatus('running')
        break
      case 'finished':
        resetCountdown()
        setStatus('idle')
        break
      default:
        throw new Error(`Invalid status: ${status}`)
    }
  }

  return (
    <div
      className="circular-progress rounded-full"
      style={{
        background: 'linear-gradient(315deg, #2E325A 0%, #0E112A 100%)',
      }}
    >
      <CircularProgress
        aria-label="Countdown timer"
        value={(count / countStart) * 100}
        valueLabel={
          <div className="relative flex min-w-[200px] flex-col items-center justify-center">
            <time className="leading-none">
              {wrapCountdownDigits(formatCount(count))}
            </time>
            <div className="absolute -bottom-16 left-1/2 flex -translate-x-1/2 transform border-none bg-transparent pl-[13px] text-center text-sm uppercase tracking-[13px] text-whisper md:text-base">
              {status !== 'idle' && (
                <button
                  type="button"
                  aria-label="reset countdown"
                  className={`${
                    status === 'finished' ? '-translate-x-1/2' : '-left-4'
                  } absolute  top-1/2 -translate-y-1/2`}
                  onClick={() => {
                    resetCountdown()
                    setStatus('idle')
                  }}
                >
                  <ArrowUturnLeftIcon className="h-6 w-6" />
                </button>
              )}
              <button type="button" onClick={handleButtonClick}>
                {(status === 'idle' || status === 'paused') && (
                  <PlayIcon className="h-12 w-12 text-white" />
                )}
                {status === 'running' && (
                  <PauseIcon className="h-12 w-12 text-white" />
                )}
              </button>
            </div>
          </div>
        }
        showValueLabel
        classNames={{
          svg: 'w-[18.5rem] h-[18.5rem] md:w-[26rem] md:h-[26rem] stroke-[0.85] fill-obsidian',
          indicator: 'stroke-theme',
          track: 'stroke-transparent',
          value: 'text-[4.5rem] md:text-[6.25rem] font-bold align-top',
        }}
      />
    </div>
  )
}
