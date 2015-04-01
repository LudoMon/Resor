var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({

    template: require('../templates/offers.jade'),

    ui: {
        offer: '.js-offer'
    },

    events: {
        'click @ui.offer': 'onOfferClick'
    },

    initialize: function (options) {
        this.searchParams = options.searchParams;
        this.booking = options.booking;
        this.listenTo(this.searchParams, 'change', this.render);
    },

    serializeData: function () {
        var dateLimits = this.searchParams.getDateLimits();
        this.collection.each(function (offer) {
            offer.set('price', offer.getMinPrice(dateLimits.from, dateLimits.to));
            offer.set('places', _.result(_.first(offer.get('availabilities')), 'places_number'));
        });
        var offers = this.collection.filter(function (offer) {
            return offer.getAvailabilities(dateLimits.from, dateLimits.to).length > 0;
        });
        return {
            offers: offers
        };
    },

    onRender: function () {
        this.ui.offer.first().click();
    },

    onOfferClick: function (event) {
        var offerId = $(event.currentTarget).data('id'),
            selectedOffer = this.collection.get(offerId),
            dateLimits = this.searchParams.getDateLimits();
        this.ui.offer.removeClass('selected');
        $(event.currentTarget).toggleClass('selected');
        this.booking.set('dailyPrice', selectedOffer.get('price'));
        this.booking.set('availabilityId', _.first(selectedOffer.getAvailabilities(dateLimits.from, dateLimits.to)).id);
    }

});
