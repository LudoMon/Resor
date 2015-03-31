var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({

    model: require('../models/result'),

    url: '/api/results',

    parse: function (response) {
        var offers = JSON.parse(response.results);
        var campings = {};
        _.each(offers, function (offer) {
            var campingId = offer.camping.id;
            if (!campings[campingId]) {
                campings[campingId] = offer.camping;
                campings[campingId].offers = [];
                campings[campingId].availabilities = [];
            }
            campings[campingId].offers.push(_.omit(offer, 'camping'));
            campings[campingId].availabilities.push(offer.availabilities);
        });
        return _.values(campings);
    }

});
