(function ($, top, GMaps, angular) {

    $(function () {
        var changePosition = $('.js-change-position'),
            positionInput = $('.js-position-place'),
            latInput = $('.js-lat'),
            lngInput = $('.js-lng'),
            map;

        map = new GMaps({
            div: '#map',
            lat: +(latInput.val()),
            lng: +(lngInput.val())
        });

    });

}(jQuery, window, GMaps, angular));

(function () {

    var app = angular.module("resultsApp", ['ngRoute', 'ngResource']);

    app.filter("capitalize", function () {
        return function (s) {
            return s[0].toUpperCase() + s.slice(1);
        };
    });

    app.factory('Result', function ($resource) {
        return $resource("/api/results/:id", {}, {
            query: {
                method: 'GET'
            }
        });
    });

    app.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/bundles/resorcore/js/pages/results.html',
            controller: 'ResultsCtrl'
        });
    });

    app.controller('ResultsCtrl', ['$scope', 'Result', function ($scope, Result) {

        Result.query({
            a: 2
        }, function (data) {
            $scope.results = data.results;
            $scope.filters = _.map(_.reduce(_.map($scope.results, function (result) {
                return result.features;
            }), function (memo, curr) {
                return _.union(memo, curr);
            }, []), function (filter) {
                return {
                    name: filter,
                    on: false
                };
            });
        });


        $scope.filterByFeatures = function (result) {
            return $scope.filters.reduce(function(memo, filter){
                return memo && !(filter.on && result.features.indexOf(filter.name) < 0)
            }, true);
        };

    }]);

}());
