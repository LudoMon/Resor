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
        var dateLimits = this.searchParams.getDateLimits();
        var offers = child.getActiveOffers(dateLimits.from, dateLimits.to);
        return offers.length > 0;
    },

    initialize: function (options) {
        this.searchParams = options.searchParams;
    },

});
