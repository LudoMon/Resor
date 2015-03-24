var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    defaults: {
        secondaryFilters: []
    },

    getActiveFeatures: function () {
        return _.reduce(this.get('secondaryFilters'), function (memo, on, feature) {
            if (on) {
                memo.push(feature);
            }
            return memo;
        }, []);
    }

});
