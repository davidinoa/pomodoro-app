// countdownWorker.js
const COUNTDOWN_INTERVAL = 1000
let count = 0
let intervalId = null
let isPaused = false

function startCountdown() {
  if (intervalId === null) {
    // Send the initial count right away
    postMessage(count)

    // Start the interval
    intervalId = setInterval(() => {
      if (!isPaused) {
        if (count > 0) {
          count -= 1
        }
        postMessage(count)
        if (count <= 0) {
          clearInterval(intervalId)
          intervalId = null
        }
      }
    }, COUNTDOWN_INTERVAL)
  }
}

onmessage = (e) => {
  switch (e.data.action) {
    case 'start':
      if (intervalId === null) {
        count = e.data.countStart
        startCountdown()
      }
      isPaused = false
      break
    case 'stop':
      isPaused = true
      break
    case 'reset':
      count = e.data.countStart
      isPaused = false
      if (intervalId !== null) {
        clearInterval(intervalId)
        intervalId = null
      }
      postMessage(count) // Immediately post the reset count
      break
    default:
      break
  }
}
