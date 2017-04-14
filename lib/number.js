/* Copyright (c) 2017 Mikal Stordal | MIT licensed */
'use strict'

/**
 * Moduel export
 */
module.exports = Base => class NumberBase extends Base {
  /**
   * Check if `option` is a number.
   *
   * @param {String} option
   * @returns {Boolean}
   * @public
   */
  isNumber(option) {
    return typeof this.get(option) === 'number'
  }

  /**
   * Increments `option` by one `step`.
   *
   * @param {String} option
   * @public
   */
  increment (option, step = 1) {
    let num

    // Check if we have an existing number
    if (this.isNumber(option)) {
      // get existing number
      num = this.get(option)
    }

    // if no number is found, we start over
    else {
      num = 0
    }

    // Increment
    num += step

    // Save new value back to store
    this.set(option, num)

    return this
  }

  /**
   * Decrements `option` by one `step`.
   *
   * @param {String} option
   * @public
   */
  decrement (option, step = 1) {
    this.increment(option, -(step))

    return this
  }

  /**
   * Check if `option` is greater than `value`.
   *
   * @param {String} option
   * @returns {Boolean}
   * @public
   */
  gt (option, value) {
    return this.get(option) > value
  }

  /**
   * Check if `option` is greater than or equal to `value`.
   *
   * @param {String} option
   * @returns {Boolean}
   * @public
   */
  gte (option, value) {
    return this.get(option) >= value
  }

  /**
   * Check if `option` is less than `value`.
   *
   * @param {String} option
   * @returns {Boolean}
   * @public
   */
  lt (option, value) {
    return this.get(option) < value
  }

  /**
   * Check if `option` is less than or equal to `value`.
   *
   * @param {String} option
   * @returns {Boolean}
   * @public
   */
  lte (option, value) {
    return this.get(option) <= value
  }

  /**
   * Check if `option` is equal to `value`.
   *
   * @param {String} option
   * @returns {Boolean}
   * @public
   */
  eq (option, value) {
    return this.get(option) === value
  }

  /**
   * Check if `option` is not equal to `value`.
   *
   * @param {String} option
   * @returns {Boolean}
   * @public
   */
  neq (option, value) {
    return this.get(option) !== value
  }

  /**
   * Check if `option` is within lower and greater limit.
   * Inclusive.
   * 
   * @param {String} option
   * @returns {Boolean}
   * @public
   */
  rg (option, lower, higher) {
    return this.gte(option, lower)
    &&     this.lte(option, higher)
  }

  /**
   * Check if `option` is outside lower and greater limit.
   * Inclusive.
   * 
   * @param {String} option
   * @returns {Boolean}
   * @public
   */
  nrg (option, lower, higher) {
    return this.lt(option, lower)
    ||     this.gt(option, higher)
  }
}