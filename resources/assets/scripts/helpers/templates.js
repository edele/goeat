'use strict'

import hbs from 'handlebars/runtime'
import numberFormat from 'utilities/number/format'
import plural from 'utilities/string/plural'
import lineBreaks from 'utilities/string/line.breaks'
import toString from 'utilities/to/string'
import is from 'utilities/handlebars/is'
import groupDigits from 'utilities/number/groupDigits'

function renderOption(item, selected) {
    const selectedAttr = selected && item.value === selected ? ' selected' : ''
    const disabledAttr = item.disabled ? 'disabled' : ''

    return `<option ${selectedAttr} ${disabledAttr} value="${item.value}">${item.label}</option>`
}

hbs.registerHelper({
    plural: (number, one, two, five) => plural(number, one, two, five),

    number: (x, frac) => numberFormat(x, frac),

    groupDigits: (x) => groupDigits(x),

    lowercase: x => x.toLowerCase(),

    defaultValue: (value, placeholder) => toString(value).length ? value : placeholder,

    property: (source, prop) => source[prop],

    is: function (left, op, right, options) {
        return is.call(this, left, op, right, options)
    },

    ext: file => file.split('.').pop(),

    lineBreaks: (text) => lineBreaks(text),

    select: function (options) {
        const { list, name, classes, selected } = options.hash

        let result = list.map(x => {
            let opt

            if (x.group) {
                opt = `<optgroup label="${x.label}">` + x.items.map(z => renderOption(z, selected)).join('') + `</optgroup>`
            } else {
                opt = renderOption(x, selected)
            }

            return opt
        })

        return new hbs.SafeString(`<select class="${classes}" name="${name}" id="${name}">` + result.join('') + '</select>')
    }
})
