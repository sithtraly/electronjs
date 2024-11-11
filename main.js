const { ipcMain } = require('electron')
const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const { conntectDb } = require('./db.config')
const { route } = require('./constants/route')

var win
function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: false,
      nodeIntegration: true,
    }
  })

  win.loadFile(route.home)
  conntectDb()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  app.quit()
  // if (process.platform !== 'darwin') {
  // }
})

ipcMain.on('changeTo', (event, value) => {
  if (typeof value == 'string') win.loadFile(value)
  else if (Array.isArray(value)) {
    const file = value[0]
    const val = value[1]
    win.loadFile(file, { query: { data: JSON.stringify({ val }) } })
  }
})