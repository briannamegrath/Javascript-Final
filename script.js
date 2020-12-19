let settings = {
  showSeconds: true,
  showFullDate: false,
  apiKey: '7dSlUhvTPJW8pkqGxbdjZxB1nGjDL7TfxU7zRPRF',
  api: 'https://api.nasa.gov/planetary/apod?api_key='
}

const DateTime = luxon.DateTime

function createClock () {
  const now = DateTime.local()
  const day = now.day
  const month = now.month
  const year = now.year
  let hour = now.toLocaleString(DateTime.TIME_SIMPLE)
  let time = '<p>'
  if (settings.showFullDate) {
    time += ` ${day}/${month}/${year}/`
  }
  if (settings.showSeconds) {
    hour = now.toLocaleString(DateTime.TIME_WITH_SECONDS)
  }
  time += `${hour}`
  if (hour < 12) {
    document.getElementById('pm').style = 'display:none'
  }else {
    document.getElementById('am').style = 'display:none'
  }
  time += '</p>'
  document.getElementById('clock').innerHTML = time
}

setInterval(() => {
  createClock()
}, 100)

function changeSettings (event) {
  event.preventDefault()
  changeFullDateSettings()
  changeSecondsSettings()
  localStorage.setItem('settings', JSON.stringify(settings))
}

function changeFullDateSettings () {
  const $fullDate = document.getElementsByName('full')

  settings.showFullDate = $fullDate[0].checked
}

function changeSecondsSettings () {
  const $showSettings = document.getElementsByName('seconds')

  settings.showSeconds = $showSettings[0].checked
}

document.getElementById('submit').addEventListener('click', changeSettings)
const loadedsettings = localStorage.getItem('settings')

if (loadedsettings !== null) {
  settings = JSON.parse(loadedsettings)
}

function setBackground () {
  const bgUrl = `${settings.api}${settings.apiKey}`
  fetch(bgUrl)
    .then(response => response.json())
    .then(json => {
      const picture = json.url
      document.getElementsByTagName('html')[0].style = `height: 100%;background: url('${picture}'); background-repeat: no-repeat; background-size: 100% 100%;`
    })
}

setBackground()

function show () {
  document.getElementById('sidebar').classList.toggle('active')
}
