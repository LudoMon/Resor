var Marionette = require('backbone.marionette');

module.exports = Marionette.CollectionView.extend({

    childView: require('./result'),

    childViewOptions: function () {
        return {
            searchParams: this.searchParams
        };
    },

    emptyView: require('./noResults'),

    filter: function (child, index, collection) {
        return child.isActive(this.searchParams.getActiveFeatures());
    },

    initialize: function (options) {
        this.searchParams = options.searchParams;
        this.listenTo(this.searchParams, 'change', this.render);
    },

});
