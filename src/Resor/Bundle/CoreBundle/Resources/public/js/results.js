(function () {

    var app = angular.module("resultsApp", ['ngRoute', 'ngResource', 'uiGmapgoogle-maps', 'ngAutocomplete']);

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

    app.controller('ResultsCtrl', ['$scope', '$location', 'Result', function ($scope, $location, Result) {

        $scope.results = [];
        $scope.filters = [];

        var urlParams = $location.search();
        var lat = urlParams["lat"] || null;
        var lng = urlParams["lng"] || null;
        var from = urlParams["from"] || null;
        var to = urlParams["to"] || null;
        var place = urlParams["place"] || "";

        $scope.place = {
            map:{
                center: {
                    latitude: +(lat),
                    longitude: +(lng)
                },
                zoom: 9
            },
            name: place
        };

        $scope.date = {
            from: from,
            to: to
        };

        Result.query({
            from: from,
            to: to,
            lat: lat,
            lng: lng
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

        $scope.displayFilters = false;

        $scope.filterByFeatures = function (result) {
            return $scope.filters.reduce(function(memo, filter){
                return memo && !(filter.on && result.features.indexOf(filter.name) < 0)
            }, true);
        };

        $scope.togglePlaceInput = function () {
            $scope.displayPlaceInput = !$scope.displayPlaceInput;
        }

        $scope.$on('placeAutocomplete', function () {
            $scope.togglePlaceInput();
        });

        $scope.placeInputOptions = {
            callback: $scope.togglePlaceInput
        };

    }]);

}());
