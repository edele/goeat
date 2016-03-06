'use strict'

import stripTags from './strip.tags'

export default function highlightTerms(params = {}) {
    const term = String(stripTags(params.term))
    const pattern = new RegExp(`(${term})`, 'gi')

    if (!term) {
        return params.html || params.string
    }

    if (params.html) {
        let html = String(params.html)

        html = html.replace(pattern, '<mark>$1</mark>')
        html = html.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/, '$1</mark>$2<mark>$4')

        return html
    }

    if (params.string) {
        let string = String(params.string)

        return string.replace(pattern, '<mark>$1</mark>')
    }
}
