import { app, electron } from '../app/electron'

// Window

export const currentWindow = () => {
  if (!electron) {
    return false
  }

  return electron.remote.getCurrentWindow()
}

export const isFocused = () => {
  const current = currentWindow()

  if (!current) {
    return undefined
  }

  return current.isFocused()
}

export const focus = () => {
  const current = currentWindow()

  if (!current) {
    return undefined
  }

  current.show()

  return current.focus()
}

// Badge

export const incrementBadge = () => {
  if (!app) {
    return false
  }

  if (isFocused()) {
    return false
  }

  return app.setBadgeCount(app.getBadgeCount() + 1)
}

export const clearBadge = () => {
  if (!app) {
    return false
  }

  return app.setBadgeCount(0)
}
