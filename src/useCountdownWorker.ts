import { useEffect, useRef, useState } from 'react'
// eslint-disable-next-line import/extensions
import workerUrl from './countdownWorker.js?url'

export default function useCountdownWorker(countStartMinutes: number) {
  const countStartSecondsRef = useRef(countStartMinutes * 60)
  const [count, setCount] = useState(countStartSecondsRef.current)
  const workerRef = useRef<Worker>()

  useEffect(() => {
    const countStartSeconds = countStartSecondsRef.current
    workerRef.current = new Worker(new URL(workerUrl, import.meta.url))
    workerRef.current.onmessage = (e) => {
      setCount(e.data)
    }
    return () => {
      workerRef.current?.postMessage({
        action: 'reset',
        countStart: countStartSeconds,
      })
      workerRef.current?.terminate()
    }
  }, [])

  const startCountdown = () => {
    workerRef.current?.postMessage({
      action: 'start',
      countStart: countStartSecondsRef.current,
    })
  }

  const stopCountdown = () => {
    workerRef.current?.postMessage({ action: 'stop' })
  }

  const resetCountdown = () => {
    workerRef.current?.postMessage({
      action: 'reset',
      countStart: countStartSecondsRef.current,
    })
    setCount(countStartSecondsRef.current)
  }

  return { count, startCountdown, stopCountdown, resetCountdown }
}
