'use strict'

import { isUndefined, isNull } from 'underscore'

/**
 * Checks if `target` is 'null' or `undefined`.
 *
 * @param {*} target The value to check.
 * @returns {boolean} Return `true` if `target` is not `null` and `undefined`, else `false`.
 *
 * @example
 *
 * isExists(null)
 * // => false
 *
 * isExists('')
 * // => true
 */
export default target => !isUndefined(target) && !isNull(target)
