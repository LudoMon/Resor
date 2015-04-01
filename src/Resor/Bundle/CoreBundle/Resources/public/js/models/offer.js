var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    idAttribute: 'id',

    getAvailabilities: function (from, to) {
        return _.filter(this.get('availabilities'), function (availability) {
            var startDate = moment(availability.start_date);
            var endDate = moment(availability.end_date);
            return (moment(startDate).isBefore(from) || moment(startDate).isSame(from))
                && (moment(endDate).isAfter(to) || moment(endDate).isSame(to))
                && availability.is_open
                && availability.places_number > 0;
        });
    },

    getMinPrice: function (from, to) {
        var availabilities = this.getAvailabilities(from, to);
        if (availabilities.length === 0) {
            return false;
        }
        return _.min(_.pluck(availabilities, 'price'));
    }

});
