import { CircularProgress } from '@nextui-org/react'
import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

type CountdownTimerProps = {
  countStartMinutes: number
}

export default function CountdownTimer({
  countStartMinutes,
}: CountdownTimerProps) {
  const countStartSeconds = countStartMinutes * 60
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: countStartSeconds,
    })

  useEffect(() => {
    if (count === 0) {
      // eslint-disable-next-line no-alert
      alert('Time is up!')
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

  return (
    <>
      <div
        className="circular-progress rounded-full"
        style={{
          background: 'linear-gradient(315deg, #2E325A 0%, #0E112A 100%)',
        }}
      >
        <CircularProgress
          value={(count / countStartSeconds) * 100}
          valueLabel={
            <div className="relative flex min-w-[200px] flex-col items-center justify-center">
              <time className="leading-none">
                {wrapCountdownDigits(formatSeconds(count))}
              </time>
              <button
                className="absolute -bottom-7 left-1/2 -translate-x-1/2 transform border-none bg-transparent text-whisper"
                type="button"
                onClick={startCountdown}
                style={{ fontSize: 14 }}
              >
                start
              </button>
            </div>
          }
          showValueLabel
          classNames={{
            svg: 'w-[18.5rem] h-[18.5rem] stroke-[0.85] fill-obsidian',
            indicator: 'stroke-sunset',
            track: 'stroke-transparent',
            value: 'text-[5rem] font-bold align-top',
          }}
        />
      </div>
      <div>
        <button type="button" onClick={stopCountdown}>
          stop
        </button>
        <button type="button" onClick={resetCountdown}>
          reset
        </button>
        <p>{countStartMinutes}</p>
      </div>
    </>
  )
}
