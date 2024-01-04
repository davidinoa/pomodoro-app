const COUNTDOWN_INTERVAL = 1000
let count = 0
let intervalId = null

function clearCountdownInterval() {
  if (intervalId !== null) {
    clearInterval(intervalId)
    intervalId = null
  }
}

function startCountdown(initialCount) {
  if (count === 0) count = initialCount
  if (intervalId !== null) return

  intervalId = setInterval(() => {
    if (count > 0) {
      count -= 1
      postMessage(count)
    } else {
      clearCountdownInterval()
    }
  }, COUNTDOWN_INTERVAL)
}

onmessage = (e) => {
  if (typeof e.data.countStart !== 'number' || e.data.countStart < 0) {
    console.error('Invalid countStart value')
    return
  }

  const { countStart } = e.data
  switch (e.data.action) {
    case 'start':
      startCountdown(countStart)
      break
    case 'stop':
      clearCountdownInterval()
      break
    case 'reset':
      count = countStart
      clearCountdownInterval()
      postMessage(countStart)
      break
    default:
      console.error(`Unknown action: ${e.data.action}`)
      break
  }
}
