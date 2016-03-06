'use strict'

import Backbone from 'backbone'
import $ from 'jquery'
Backbone.$ = $

import Marionette from 'backbone.marionette'
import navigate from './navigate'
import Model from './model'
import Collection from './collection'

export default {
    Application: Marionette.Application,
    Router: Marionette.AppRouter,
    Object: Marionette.Object,
    LayoutView: Marionette.LayoutView,
    ItemView: Marionette.ItemView,
    CompositeView: Marionette.CompositeView,
    CollectionView: Marionette.CollectionView,
    Region: Marionette.Region,
    Behavior: Marionette.Behavior,
    Collection: Collection,
    Model: Model,
    History: Backbone.history,
    navigate: navigate
}
