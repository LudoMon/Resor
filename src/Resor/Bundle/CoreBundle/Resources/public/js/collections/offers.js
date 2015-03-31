var Backbone = require('backbone');

var Offer = require('../models/offer');

module.exports = Backbone.Collection.extend({

    model: Offer

});
