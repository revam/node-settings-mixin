/* Copyright (c) 2017 Mikal Stordal | MIT licensed */
'use strict'

/**
 * Moduel export
 */
module.exports = Base => class MultiBase extends Base {
  get (option, replacement) {
    if (!Array.isArray(option))
    return super.get(option, replacement)

    let object = Object.create(null)

    const nulSymbol = Symbol()

    for (let idx in option) {
      let key = option[idx]
      let val = super.get(key, nulSymbol)

      // Skip getters with no value
      if (val === nulSymbol)
      continue
      
      let keys = key.split('.')
      if (keys.length === 1) {
        object[key] = val
      }

      else {
        let len, obj, ley, idx, rec, cur, typ 
        len = keys.length - 1

        // Set index after we ckeched path
        idx = 0

        // Searches until path (or nil) is reached
        rec = (obj) => {
          if (idx >= len) return obj

          ley = keys[idx++]
          cur = obj[ley]
          typ = typeof cur

          // We create a new path when none is found
          if (typ === 'undefined') {
            cur = obj[ley] = {}
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

        obj = rec(obj)

        // Get desired path's end's parent
        obj = rec(this.__settings)

        // Only set value if we finished the recurring search properly
        if (obj !== null && idx >= len) {
          obj[keys[idx]] = val
        }
      }
    }

    return object
  }
}