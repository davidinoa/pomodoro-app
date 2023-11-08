import { useEffect } from 'react'
import { useCountdown } from 'usehooks-ts'

export default function CountdownTimer() {
  const [count, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 25 * 60,
      intervalMs: 1000,
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
  return (
    <div className="flex gap-4">
      <p>{formatSeconds(count)}</p>
      <button type="button" onClick={startCountdown}>
        start
      </button>
      <button type="button" onClick={stopCountdown}>
        stop
      </button>
      <button type="button" onClick={resetCountdown}>
        reset
      </button>
    </div>
  )
}
