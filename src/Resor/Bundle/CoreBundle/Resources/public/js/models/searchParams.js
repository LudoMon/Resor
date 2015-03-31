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
    },

    buildUrl: function (url) {
        return url + '?place=' + this.get('place') + '&lat=' + this.get('lat')
            + '&lng=' + this.get('lng') + '&from=' + this.get('from')
            + '&to=' + this.get('to');
    },

    getDateLimits: function () {
        return {
            from: moment(this.get('from'), 'DD/MM/YYYY'),
            to: moment(this.get('to'), 'DD/MM/YYYY')
        };
    },

    getDuration: function () {
        return this.getDateLimits().to.diff(this.getDateLimits().from, 'days') + 1;
    }

});
