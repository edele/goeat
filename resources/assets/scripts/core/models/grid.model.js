'use strict'

/**
 * Базовая модель для страницы с гридом
 */

import _ from 'underscore'
import app from '../app'
import cfg from '../../config'
import sort from '../../definitions/sort'

export default app.Model.extend({
    defaults: {
        filter: 'total',
        pageNumber: 1,
        pageSize: cfg.rowsPerPage,
        sort: 'id',
        direction: sort.asc
    },

    fetch(opts = {}) {
        const options = {
            data: this.pick('pageNumber', 'pageSize', 'sort', 'direction')
        }

        if (opts.data) {
            _.extend(options.data, opts.data)
        }

        return app.Model.prototype.fetch.call(this, options)
    },

    prevPage() {
        this.set({ pageNumber: this.get('pageNumber') - 1 })
    },

    nextPage() {
        this.set({ pageNumber: this.get('pageNumber') + 1 })
    }
})

