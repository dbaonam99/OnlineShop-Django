import Cookies from 'js-cookie'

export const allowedKeys = {
  TOKEN_KEY: 're_admin_token',
  PROFILE_KEY: 're_admin_profile',
}

const cookieOptions = {
  //todo: remember to enable on real production
  // sameSite: process.env.NODE_ENV === 'production' ? 'strict' : undefined,
  // secure: process.env.NODE_ENV === 'production'
}

class StorageService {
  listeners = {}

  constructor() {
    Object.values(allowedKeys).forEach((key) => {
      //@ts-ignore
      this.listeners[key] = []
    })

    this.runListenersFor = this.runListenersFor.bind(this)
    this._get = this._get.bind(this)
  }

  get token() {
    return Cookies.get(allowedKeys.TOKEN_KEY)
  }

  set token(newValue) {
    if (typeof newValue === 'undefined') {
      Cookies.remove(allowedKeys.TOKEN_KEY)
      return
    }

    Cookies.set(allowedKeys.TOKEN_KEY, newValue, cookieOptions)
    this.runListenersFor(allowedKeys.TOKEN_KEY, newValue)
  }

  get profile() {
    const item = localStorage.getItem(allowedKeys.PROFILE_KEY)
    return item ? JSON.parse(item) : null
  }

  set profile(newProfile) {
    if (typeof newProfile === 'undefined') {
      localStorage.removeItem(allowedKeys.PROFILE_KEY)
      return
    }

    localStorage.setItem(allowedKeys.PROFILE_KEY, JSON.stringify(newProfile))
    this.runListenersFor(allowedKeys.PROFILE_KEY, newProfile)
  }

  //@ts-ignore
  runListenersFor(key, val) {
    //@ts-ignore
    this.listeners[key].forEach((fn) => {
      fn(val)
    })
  }
  //@ts-ignore
  registerListener(watchProp, fn, options) {
    if (!Object.values(allowedKeys).includes(watchProp)) return
    //@ts-ignore
    if (this.listeners[watchProp].includes(fn)) return
    //@ts-ignore
    this.listeners[watchProp].push(fn)

    if (options.run1st) {
      this.runListenersFor(watchProp, this._get(watchProp))
    }
  }
  //@ts-ignore
  removeListener(watchProp, fn) {
    if (!Object.values(allowedKeys).includes(watchProp)) return
    //@ts-ignore
    const index = this.listeners[watchProp].indexOf(fn)
    if (index !== -1) {
      //@ts-ignore
      this.listeners[watchProp].splice(index, 1)
    }
  }
  //@ts-ignore
  _get(prop) {
    switch (prop) {
      case allowedKeys.PROFILE_KEY:
        return this.profile
      case allowedKeys.TOKEN_KEY:
        return this.token
      default:
        return null
    }
  }
}

export default new StorageService()
