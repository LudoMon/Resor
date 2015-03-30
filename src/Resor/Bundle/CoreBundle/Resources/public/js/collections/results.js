var Backbone = require('backbone');

module.exports = Backbone.Collection.extend({

    model: require('../models/result'),

    url: '/api/results',

    parse: function (response) {
        return JSON.parse(response.results);
    }

});
