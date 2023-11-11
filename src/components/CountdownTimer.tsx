import { CircularProgress } from '@nextui-org/react'
import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

export default function CountdownTimer() {
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 5 * 60,
      intervalMs: 1000,
    })

  const circularProgressValue = Math.max(
    ((5 * 60 - count) / (5 * 60)) * 100,
    0.1,
  )
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
    const wrappedCountdown = countdown
      .split('')
      .map((char) =>
        /\d/.test(char) ? (
          <span className="inline-block w-[1ch] text-center">{char}</span>
        ) : (
          <span className="inline-block">{char}</span>
        ),
      )

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
          value={circularProgressValue}
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
      </div>
    </>
  )
}
