const path = require('path')
const { app, ipcMain } = require('electron')

const { isWindows, isMacOS } = require('./electron-src/appEnv')

const MainWindow = require('./electron-src/MainWindow')
const TimerTray = require('./electron-src/TimerTray')

const iconPath = path.resolve(
  __dirname,
  `src/assets/${ isWindows ? 'windows-icon@2x.png' : 'iconTemplate.png'}`
)

app.on('ready', onReady)


// prevent gc, otherwise icon will disappear
let mainWindow
let timerTray

function onReady () {
  if (isMacOS) {
    app.dock.hide()
  }

  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`)

  timerTray = new TimerTray(iconPath, mainWindow)
}

ipcMain.on('update-timer', (_, timeLeft) => {
  if (isMacOS) {
    timerTray.setTitle(timeLeft)
  }
})
