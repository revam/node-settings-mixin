/* Copyright (c) 2017 Mikal Stordal | MIT licensed */
'use strict'

/**
 * Moduel export
 */
module.exports = Base => class BooleanBase extends Base {
  /**
   * Check if `option` is a boolean.
   *
   * @param {String} option
   * @return {Boolean} enabled
   * @public
   */
  isBoolean (option) {
    let val = this.get(option)

    return val === true
    ||     val === false
  }

  /**
   * Check if `option` is enabled (truthy).
   *
   * @param {String} option
   * @return {Boolean} enabled
   * @public
   */
  enabled (option) {
    return Boolean(this.get(option))
  }

  /**
   * Check if `option` is disabled.
   *
   * @param {String} option
   * @return {Boolean} disabled
   * @public
   */
  disabled (option) {
    return !this.get(option)
  }

  /**
   * Enables `option`.
   *
   * @param {String} option
   * @return {this} for chaining
   * @public
   */
  enable (option) {
    return this.set(option, true)
  }

  /**
   * Disables `option`.
   *
   * @param {String} option
   * @return {this} for chaining
   * @public
   */
  disable (option) {
    return this.set(option, false)
  }
}