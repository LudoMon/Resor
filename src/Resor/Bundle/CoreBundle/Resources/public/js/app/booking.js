var Backbone = require('backbone');
var jQuery = require('jquery');
Backbone.$ = jQuery;
var Marionette = require('backbone.marionette');

// Views
var BookingView = require('../views/booking.js');

var BookingApplication = Marionette.Application.extend({

    initialize: function () {
        this.models = {
            booking: new Backbone.Model({
                from: window.exposed.from,
                to: window.exposed.to
            })
        };
        this.views = {
            booking: new BookingView({
                model: this.models.booking
            })
        };
        this.addRegions({
            booking: '#booking'
        });
        this.booking.show(this.views.booking);
    }

});

$(function () {

    var app = new BookingApplication();

    app.start();

});
