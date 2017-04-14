/* Copyright (c) 2017 Mikal Stordal | MIT licensed */
'use strict'

/**
 * Dependencies
 */
const BaseMixin = require('./lib/base')
const BooleanMixin = require('./lib/boolean')
const NumberMixin = require('./lib/number')
// const StatsMixin = require('./lib/stats')
const MultiMixin = require('./lib/multi')

module.exports = (Base, options) => {
  if (typeof Base === 'object' && options === undefined) {
    options = Base
    Base = undefined  
  }

  if (typeof Base !== 'function') {
    Base = function NoBase () {}
  }

  let opts = {
    boolean: false,
    number: false,
    // stats: false,
    multi: false
  }

  // 
  if (typeof options === 'object') 
  Object.assign(opts, options)

  // Create a new base
  let ModifiedBase = BaseMixin(Base)

  // Include extra methods for boolean handeling when requested
  if (Boolean(opts.boolean))
  ModifiedBase = BooleanMixin(ModifiedBase)

  // Include extra methods for number handeling when requested
  if (Boolean(opts.number)) 
  ModifiedBase = NumberMixin(ModifiedBase)

  // // Include extra methods for statestics when requested
  // if (Boolean(opts.stats)) 
  // ModifiedBase = StatesticsMixin(ModifiedBase)

  if (Boolean(opts.multi))
  ModifiedBase = MultiMixin(ModifiedBase)

  return ModifiedBase
}