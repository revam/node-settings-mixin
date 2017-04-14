/* Copyright (c) 2017 Mikal Stordal | MIT licensed */
'use strict'

/**
 * Moduel export
 */
module.exports = Base => class SettingsBase extends Base {
  constructor () {
    super()
 
    // Instance variables
    this.__settings = Object.create(null)
  }

  /**
   * Sets all keys from `settings`.
   *
   * @param {Object} settings
   * @return {Object} this.__settings
   * @public
   */
  set settings (settings) {
    if (!arguments.length) return this.__settings

    // If we pass a plain object
    if (typeof settings === 'object') {
      let keys, idx

      keys = Reflect.ownKeys(settings)
      idx = keys.length

      while (idx--) {
        this.set(keys[idx], settings[keys[idx]])
      }
    }

    return this.__settings
  }

  /**
   * Return a list of root objects in settings.
   *
   * @return {Object} this.__settings
   * @public
   */
  get settings () {
    return Reflect.ownKeys(this.__settings)
  }

  /**
   * Sets an option in options.
   *
   * @param {String} path
   * @param {Any} value
   * @public
   */
  set (path, value) {
    if (typeof path !== 'string') {
      return this
    }

    let keys, key, cur, idx, len, obj, rec, typ

    // Split path into keys
    keys = path.split('.')

    // Offset 1 to get parent
    len = keys.length - 1

    // With one key, we can simplify the process,
    if (!len) {
      // just set `value` under `path`.
      this.__settings[path] = value

      return this
    }

    // Set index after we ckeched path
    idx = 0

    // Searches until path (or nil) is reached
    rec = (obj) => {
      if (idx >= len) return obj

      key = keys[idx++]
      cur = obj[key]
      typ = typeof cur

      // We create a new path when none is found
      if (typ === 'undefined') {
        cur = obj[key] = {}
      }
      
      else if (typ === 'object') {
        // We abort on nil key
        if (cur === null) {
          return null
        }

        else {
          return rec(cur)
        }
      }
    
      // Also abort on non-mutable objects (e.g. strings)
      else {
        return null
      }
    }

    // Get desired path's end's parent
    obj = rec(this.__settings)

    // Only set value if we finished the recurring search properly
    if (obj !== null && idx >= len) {
      obj[keys[idx]] = val
    }

    return this
  }

  /**
  * Gets an option from options.
  * If option is not found, returns `replacement` or undefined.
  *
  * @param {String} path
  * @param {Any} [replacement]
  * @return {Any} value at the end of path, or replacement
  * @public
  */
  get (path, replacement) {
    if (typeof path !== 'string') {
      return replacement
    }

    let keys, key, cur, idx, len, val, rec

    // Split path
    keys = path.split('.')
    len = keys.length

    // If we only have one key, 
    if (len === 1)
    // check if `value` under `path` is defined,
    if (this.__settings[path] === undefined) {
      // and if it is't, return `replacement`.
      return replacement
    }

    // and if it is, return `value`.
    else {
      return this.__settings[path]
    }

    // Set index now (after we ckeched path)
    idx = 0

    // Follow path till it reaches its end (or nil)
    rec = (obj) => {
      if (idx >= len)
      return obj

      key = keys[idx++]
      cur = obj[key]

      if (cur === undefined
      ||  cur === null)
      return cur

      return rec(cur)
    }

    // Get value
    val = rec(this.__settings)
    
    // If search was interupted or end value was not defined,
    if (idx < len
    ||  val === undefined) {
      // return `replacement` (which may be undefined as well)
      return replacement
    }

    // Return `value`
    else {
      return val
    }
  }
}