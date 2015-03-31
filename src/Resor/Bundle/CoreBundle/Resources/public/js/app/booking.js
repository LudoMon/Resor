var Backbone = require('backbone');
var jQuery = require('jquery');
Backbone.$ = jQuery;
var Marionette = require('backbone.marionette');

// Views
var BookingView = require('../views/booking.js');

// Models
var SearchParams = require('../models/searchParams');

// Collections
var Offers = require('../collections/offers');

var BookingApplication = window.BookingApplication = Marionette.Application.extend({

    initialize: function (options) {
        this.models = {
            booking: new Backbone.Model({
                from: window.exposed.from,
                to: window.exposed.to,
                bookingId: window.exposed.bookingId
            }),
            searchParams: new SearchParams({
                from: exposed.from,
                to: exposed.to
            })
        };
        this.collections = {
            offers: new Offers(window.exposed.offers)
        };
        this.views = {
            booking: new BookingView({
                model: this.models.booking,
                offers: this.collections.offers,
                searchParams: this.models.searchParams
            })
        };
        this.addRegions({
            booking: '#booking'
        });
        this.booking.show(this.views.booking);
    }

});
