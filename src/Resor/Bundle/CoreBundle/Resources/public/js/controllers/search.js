var Marionette = require('backbone.marionette');

module.exports = Marionette.Controller.extend({

    initialize: function (options) {
        _.extend(this, options);
        this.vent.on('filters:location', this.onLocationChange, this);
    },

    onLocationChange: function () {
        this.collections.resultsCollection.fetch({data: this.models.searchParams.toJSON()});
    }

});
