var Backbone = require('backbone');
var jQuery = require('jquery');
Backbone.$ = jQuery;
var Marionette = require('backbone.marionette');

var ResultsCollection = require('../collections/results');
var ResultsView = require('../views/results');

var ResultsApplication = Marionette.Application.extend({

    initialize: function (options) {
        this.addRegions({
            results: '#results'
        });
        var resultsCollection = new ResultsCollection();
        var resultsView = new ResultsView({
            collection: resultsCollection
        });
        var app = this;
        resultsCollection.fetch().done(function () {
            app.results.show(resultsView);
        });
    }

});

(function () {

    var app = new ResultsApplication();
    app.start();

}());
