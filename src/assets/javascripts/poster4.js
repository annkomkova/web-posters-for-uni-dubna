import '../stylesheets/poster4.css'

const humans = document.querySelectorAll('.human')

humans.forEach((human) => {
  const r = Math.floor(Math.random() * -20)
  human.style.animationDelay = `${r}s`
  console.log(r)
})
