var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    isActive: function (activatedFeatures) {
        return _.isEmpty(_.difference(activatedFeatures, this.get('features')));
    },

    getActiveOffers: function (from, to) {
        return _.filter(this.get('offers'), function (offer) {
            var availabilities = offer.availabilities;
            var openAvailabilities = this.getAvailabilitiesForOffer(offer, from, to);
            return openAvailabilities.length > 0;
        }, this);
    },

    getAvailabilitiesForOffer: function (offer, from, to) {
        return _.filter(offer.availabilities, function (availability) {
            var startDate = moment(availability.start_date);
            var endDate = moment(availability.end_date);
            return moment(startDate).isBefore(from) && moment(endDate).isAfter(to) && availability.is_open;
        });
    },

    getMinPrice: function (from, to) {
        var offers = this.getActiveOffers(from, to);
        if (offers.length === 0) {
            return false;
        }
        return _.min(_.map(offers, function (offer) {
            var availabilities = this.getAvailabilitiesForOffer(offer, from, to);
            return _.min(_.pluck(availabilities, 'price'));
        }, this));
    }

});
