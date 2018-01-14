const { BrowserWindow } = require('electron')
const appEnv = require('./appEnv')

const mainWindowOptions = {
  height: 600,
  width: 300,
  frame: false,
  resizable: false,
  show: false,
  webPreferences: {
    backgroundThrottling: false
  }
}

class MainWindow extends BrowserWindow {
  constructor (htmlUri, options = mainWindowOptions) {
    super(options)
    this.loadURL(htmlUri)

    // used for status bar based apps
    this.on('blur', this.onBlur.bind(this))
  }

  onBlur () {
    this.hide()
  }

  toggle (clickBounds) {
    if (this.isVisible()) {
      this.hide()
    } else {
      if (clickBounds) {
        const { x, y } = clickBounds
        const { width, height } = this.getBounds()

        const xPosition = x - width / 2
        const yPosition = y - (appEnv.isWindows ? height : 0)

        this.setPosition(xPosition, yPosition)
      }

      this.show()
    }
  }
}

module.exports = MainWindow