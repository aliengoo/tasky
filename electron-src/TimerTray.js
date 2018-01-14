const { app, Tray, Menu } = require('electron')

class TimerTray extends Tray {
  constructor (iconPath, mainWindow) {
    super(iconPath)
    this.mainWindow = mainWindow
    this.setToolTip('Timer App')
    this.on('click', this.onClick.bind(this))
    this.on('right-click', this.onRightClick.bind(this))
  }

  onClick(_, clickBounds) {
    this.mainWindow.toggle(clickBounds)
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click () {
          app.quit()
        }
      }
    ])

    this.popUpContextMenu(menuConfig)
  }
}

module.exports = TimerTray

