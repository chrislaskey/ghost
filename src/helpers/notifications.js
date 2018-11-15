import { focus } from '../helpers/electron'

const isSupported = () => 'Notification' in window
const isGranted = (permission) => (permission || window.Notification.permission) === 'granted'

export const requestPermission = (callback) => {
  if (!isSupported()) {
    return false
  }

  const response = (permission) => {
    if (callback) {
      return callback(permission)
    }

    return permission
  }

  if (isGranted()) {
    return response('granted')
  }

  return window.Notification.requestPermission().then(response)
}

export const notify = (title, options) => {
  if (!isSupported()) {
    return false
  }

  if (!isGranted()) {
    const callback = (permission) => {
      if (isGranted(permission)) {
        return sendNotification(title, options)
      }

      return false
    }

    return requestPermission(callback)
  }

  return sendNotification(title, options)
}

const sendNotification = (title, options) => {
  const defaultOptions = {
    renotify: true,
    requireInteraction: true,
    tag: 'renotify',
    vibrate: [200, 100, 200]
  }

  const instance = new window.Notification(title, { ...defaultOptions, ...options })

  instance.onclick = focus

  return instance
}
