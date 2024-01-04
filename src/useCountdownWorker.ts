import { useEffect, useRef, useState } from 'react'
import workerUrl from './countdownWorker?url'

type Action = 'start' | 'stop' | 'reset'

export default function useCountdownWorker(initialCountSeconds: number) {
  const [count, setCount] = useState(initialCountSeconds)
  const workerRef = useRef<Worker>()

  function initializeWorker() {
    try {
      const url = new URL(workerUrl, import.meta.url)
      const worker = new Worker(url)
      worker.onmessage = (e) => setCount(e.data)
      worker.onerror = (e) => console.error(e.message)
      return worker
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  useEffect(() => {
    workerRef.current = initializeWorker()
    return () => {
      if (workerRef.current) workerRef.current.terminate()
    }
  }, [])

  const sendWorkerMessage = (action: Action) => {
    if (!workerRef.current) return console.error('Worker is not initialized')
    return workerRef.current.postMessage({
      action,
      countStart: initialCountSeconds,
    })
  }

  const startCountdown = () => sendWorkerMessage('start')
  const stopCountdown = () => sendWorkerMessage('stop')
  const resetCountdown = () => sendWorkerMessage('reset')

  return { count, startCountdown, stopCountdown, resetCountdown }
}
