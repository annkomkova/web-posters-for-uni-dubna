import '../stylesheets/poster9.css'

const INTERVAL_MS = 6000
const TRANSITION_MS = 600

const poster = document.getElementById('poster')

const dots = Array.from(poster.querySelectorAll('.dot'))

dots.forEach((dot) => {
  dot.style.transition = `left ${TRANSITION_MS}ms ease, top ${TRANSITION_MS}ms ease, transform ${TRANSITION_MS}ms ease`
})

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function placeDotRandomly(dot) {
  const containerWidth = poster.clientWidth
  const containerHeight = poster.clientHeight

  const rect = dot.getBoundingClientRect()
  const dotWidth = rect.width
  const dotHeight = rect.height

  const maxLeft = Math.max(0, containerWidth - dotWidth)
  const maxTop = Math.max(0, containerHeight - dotHeight)

  const left = randInt(0, Math.round(maxLeft))
  const top = randInt(0, Math.round(maxTop))

  dot.style.left = left + 'px'
  dot.style.top = top + 'px'
}

dots.forEach((dot) => placeDotRandomly(dot))

const intervalId = setInterval(() => {
  dots.forEach((dot) => placeDotRandomly(dot))
}, INTERVAL_MS)

window.__randomDotsController = {
  stop() {
    clearInterval(intervalId)
  },
  start() {
    this.stop()
    setInterval(() => dots.forEach((dot) => placeDotRandomly(dot)), INTERVAL_MS)
  },
  placeNow() {
    dots.forEach((dot) => placeDotRandomly(dot))
  }
}
