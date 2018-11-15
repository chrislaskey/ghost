// Access running Electron instance. Returns `null` if application is not
// running inside electron
//
// For more information see: https://github.com/electron/electron/issues/7300

export const electron = ('require' in window) ? window.require('electron') : null
export const app = electron ? electron.remote.app : null

// Electron Configuration

export const configureElectronApp = () => {
  if (!app) {
    return false
  }

  app.on('browser-window-focus', () => app.setBadgeCount(0))
  // app.dock.setMenu()
  // app.dock.setIcon()
  // app.setAboutPanelOptions(options)
  // app.setBadgeCount(0)
}

configureElectronApp()

export default electron
