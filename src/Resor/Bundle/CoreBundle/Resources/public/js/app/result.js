var Backbone = require('backbone');
var jQuery = require('jquery');
Backbone.$ = jQuery;
var Marionette = require('backbone.marionette');

// Models
var SearchParams = require('../models/searchParams');

// Collections
var ResultsCollection = require('../collections/results');

// Views
var ResultsView = require('../views/results');
var FiltersView = require('../views/filters');
var MapView = require('../views/mapView');

// Controllers
var SearchController = require('../controllers/search');

var ResultsApplication = Marionette.Application.extend({

    initialize: function (options) {
        var app = this;
        this.collections = {
            resultsCollection: new ResultsCollection()
        };
        this.models = {
            searchParams: new SearchParams({
                lat: exposed.lat,
                lng: exposed.lng
            })
        };
        this.views = {
            resultsView: new ResultsView({
                collection: this.collections.resultsCollection,
                searchParams: this.models.searchParams
            }),
            filtersView: new FiltersView({
                model: this.models.searchParams,
                collection: this.collections.resultsCollection,
                vent: app.vent
            }),
            mapView: new MapView({
                model: this.models.searchParams,
                collection: this.collections.resultsCollection,
                vent: app.vent
            })
        };
        this.controllers = {
            searchController: new SearchController({
                models: this.models,
                view: this.views,
                collections: this.collections,
                vent: app.vent
            })
        };
        this.addRegions({
            results: '#results',
            filters: '#filters',
            map: '#map'
        });
        this.filters.show(this.views.filtersView);
        this.map.show(this.views.mapView);
        this.collections.resultsCollection.fetch({data: this.models.searchParams.toJSON()}).done(function () {
            app.results.show(app.views.resultsView);
        });
    }

});

(function () {

    var app = new ResultsApplication();
    app.start();

}());
