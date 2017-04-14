/* Copyright (c) 2017 Mikal Stordal | MIT licensed */
'use strict'

/**
 * Moduel export
 */
module.exports = Base => class NumberBase extends Base {
  constructor () {
    super()

    this.__stats = {
      hits: 0,
      miss: 0,
      gets: 0,
      sets: 0
    }
  }
  
  stats () {
    return copy(this.__stats)
  }
}

function copyStats (original) {
  let keys = Reflect.ownKeys(original)
  let stats = Object.create(null)

  // Copy all numerical values from original statstics
  for (let key in keys)
  if (typeof original[key] === 'number')
  stats[key] = original[key]

  // Return the shallow copy of the original
  return stats
}