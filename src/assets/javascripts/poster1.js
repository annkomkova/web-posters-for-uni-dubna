import '../stylesheets/poster1.css'
console.log('poster 1')

const root = document.documentElement
function setVar(name, val) {
  root.style.setProperty(name, val)
}

function updateSVG() {
  const freq = parseFloat(document.getElementById('noise-frequency').value)
  const scale = document.getElementById('distortion-strength').value
  document
    .querySelector('feTurbulence')
    .setAttribute('baseFrequency', `${freq} ${freq}`)
  document.querySelector('feDisplacementMap').setAttribute('scale', scale)
}

const canvas = document.getElementById('c')
const ctx = canvas.getContext('2d')
let W, H, DPR

function resize() {
  DPR = devicePixelRatio || 1
  W = canvas.width = (innerWidth / 2) * DPR
  H = canvas.height = innerHeight * DPR
  canvas.style.width = innerWidth / 2 + 'px'
  canvas.style.height = innerHeight + 'px'
  ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
}
resize()
window.addEventListener('resize', () => {
  resize()
  wrapText()
})

// Задаем большой текст
const largeText = `Патент «Плоский тонкий суперконденсатор с низким сопротивлением и способ его изготовления» был получен доцентом
       кафедры нанотехнологий и новых материалов Александром Воропаем в соавторстве с ведущим научным сотрудником Центра
       новых химических технологий ИК СО РАН Юрием Суровикиным. Обладателем исключительного права на изобретение является
       Государственный университет «Дубна». Суперконденсатор изготавливается из пористого углерода и углеродного
       нанокомпозита в виде плоского тонкого устройства с чередованием слоев, включая комбинированный электрод,
       накапливающий заряд. Изобретение может использоваться в различных областях промышленности в качестве миниатюрного
       импульсного источника питания. Например, он может быть внедрен в интернет-вещи, особенно с солнечными элементами,
       бытовую технику, источники бесперебойного питания, портативные электронные устройства и медицинские носимые
       аппараты — эта область применения открывается благодаря толщине суперконденсатора 0,6 мм. Суперконденсатор основан
       на эффекте образования двойного электрического слоя, который возникает на поверхности любого электрода, погруженного
       в электролит. При этом если на электрод подать потенциал (напряжение), то состав двойного электрического слоя, а
       именно концентрация ионов электролита на поверхности электрода, изменяется и это приводит к накоплению энергии,
       а при разряде состав возвращается в исходное состояние. Этот процесс протекает без существенных повреждений самих
       электродов, именно поэтому ресурс суперконденсаторов намного больше, чем у аккумуляторов. По своей сути суперконденсатор
        — это химический источник тока, и применяется он для питания электронных устройств, но его отличает от аккумулятора
        способность выдавать большую мощность. На сегодняшний день эти устройства применяются в питании интернет-вещей,
        портативной электронике, в том числе носимых медицинских гаджетах, в активных RFID-метках и т. д. Также на
        сегодняшний день эти устройства активно применяются в энергетике в системах оперативного постоянного тока, сетевых
        накопителях для компенсации пиковых нагрузок, энергороутерах и др. Тренд на уменьшение толщины связан с появление
        новых областей применения суперконденсаторов, а именно с возможностью создания умной одежды, носимой медицинской
        электроники. Также это важно и для современных гаджетов, где поверхностный монтаж становится плотнее, а толщина
        плат меньше. Таким образом, обычные цилиндрические суперконденсаторы или монеточные суперконденсаторы в этом плане
        проигрывают конкуренцию плоским тонким суперконденсаторам.`

let leftText = []
const lineH = 20
const startY = 10
const maxWidth = window.innerWidth / 2 // отступ 20px с каждой стороны

// Функция для автоматического переноса текста
function wrapText() {
  ctx.font = '20px Arial'
  ctx.color = 'red'
  leftText = []
  const words = largeText.split(/\s+/)
  let line = ''
  for (let i = 0; i < words.length; i++) {
    const testLine = line + (line ? ' ' : '') + words[i]
    const metrics = ctx.measureText(testLine)
    if (metrics.width / 2 > maxWidth) {
      leftText.push(line)
      line = words[i]
    } else {
      line = testLine
    }
  }
  if (line) leftText.push(line)
}

wrapText()

function renderLine(text, baseX, baseY, distort) {
  let x = baseX
  const chars = [...text]
  const t = performance.now()
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i]
    const charWave = Math.sin(i * 0.45 + t * 0.003) * distort * 0.6
    const charVert = Math.cos(i * 0.2 + t * 0.002) * distort * 0.4
    ctx.fillText(c, x + charWave, baseY + charVert)
    x += ctx.measureText(c).width
  }
}

function animate() {
  ctx.clearRect(0, 0, innerWidth, innerHeight)
  // ctx.fillStyle = 'blue'
  var grd = ctx.createLinearGradient(0, 0, innerWidth, 0)
  grd.addColorStop(0, 'blue')
  grd.addColorStop(1, '#b0b6e8')

  ctx.fillStyle = grd
  ctx.font = '3vw Arial'
  ctx.textBaseline = 'top'

  for (let i = 0; i < leftText.length; i++) {
    const y = startY + i * lineH
    const norm = y / innerHeight
    const distort = Math.pow(norm, 1.5) * 56
    renderLine(leftText[i], 20, y, distort)
  }

  requestAnimationFrame(animate)
}
requestAnimationFrame(animate)
