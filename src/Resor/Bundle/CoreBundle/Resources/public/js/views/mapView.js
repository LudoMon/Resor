var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({

    template: require('../templates/mapView.jade'),

    modelEvents: {
        'change': 'resetMap'
    },

    initialize: function (options) {
        this.vent = options.vent;
        this.listenTo(this.collection, 'sync', this.resetMarkers);
        this.listenTo(this.collection, 'reset', this.resetMarkers);
        this.vent.on('filters:location', this.updateLocation, this);
        this.vent.on('filters:features', this.resetMarkers, this);
    },

    onShow: function () {
        this.map = new GMaps({
            div: '#top-map',
            lat: this.model.get('lat'),
            lng: this.model.get('lng'),
            zoom: 12
        });
        this.resetMarkers();
    },

    resetMap: function () {
        this.map.setCenter(this.model.get('lat'), this.model.get('lng'));
    },

    resetMarkers: function () {
        this.map.removeMarkers();
        if (this.collection.isEmpty()) {
            return;
        }
        this.collection.each(function (result) {
            if (!result.isActive(this.model.getActiveFeatures())) {
                return false;
            }
            this.map.addMarker({
                lat: result.get('lat'),
                lng: result.get('lng'),
                title: result.get('title')
            });
        }, this);
    },

    updateLocation: function (result) {
        var newLat = result.geometry.location.k,
            newLng = result.geometry.location.D;
        if (newLat === this.model.get('lat') && newLng === this.model.get('lng')) {
            return true;
        }
        this.model.set({
            lat: newLat,
            lng: newLng,
            place: result.formatted_address
        });
    }

});
