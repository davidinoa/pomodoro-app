import { CircularProgress } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useCountdown } from 'usehooks-ts'

type CountdownTimerProps = {
  countStartMinutes: number
}

type Status = 'idle' | 'running' | 'paused' | 'finished'

export default function CountdownTimer({
  countStartMinutes,
}: CountdownTimerProps) {
  const countStartSeconds = countStartMinutes * 60
  const [status, setStatus] = useState<Status>('idle')
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: countStartSeconds,
    })

  useEffect(() => {
    if (count === 0) {
      setStatus('finished')
    }
  }, [count])

  function formatSeconds(seconds: number): string {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
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
        startCountdown()
        setStatus('running')
        break
      case 'running':
        stopCountdown()
        setStatus('paused')
        break
      case 'paused':
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
        value={(count / countStartSeconds) * 100}
        valueLabel={
          <div className="relative flex min-w-[200px] flex-col items-center justify-center">
            <time className="leading-none">
              {wrapCountdownDigits(formatSeconds(count))}
            </time>
            <button
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 transform border-none bg-transparent pl-[13px] text-center text-sm uppercase tracking-[13px] text-whisper"
              type="button"
              onClick={handleButtonClick}
            >
              {status === 'idle' && 'Start'}
              {status === 'running' && 'Pause'}
              {status === 'paused' && 'Resume'}
              {status === 'finished' && 'Reset'}
            </button>
          </div>
        }
        showValueLabel
        classNames={{
          svg: 'w-[18.5rem] h-[18.5rem] stroke-[0.85] fill-obsidian',
          indicator: 'stroke-theme',
          track: 'stroke-transparent',
          value: 'text-[4.5rem] font-bold align-top',
        }}
      />
    </div>
  )
}
