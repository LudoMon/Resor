(function () {

    'use strict';

    var app = angular.module("resultsApp", ['ngRoute', 'ngResource', 'uiGmapgoogle-maps', 'ngAutocomplete', 'angularPikaday']);

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

    app.factory('Url', function ($location) {
        var urlParams = $location.search();
        return {
            lat: urlParams["lat"] || null,
            lng: urlParams["lng"] || null,
            from: urlParams["from"] || null,
            to: urlParams["to"] || null,
            place: urlParams["place"] || ""
        };
    });

    app.config(function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: '/bundles/resorcore/js/pages/results.html',
            controller: 'ResultsCtrl'
        });
    });

    app.controller('PrimaryFiltersCtrl', ['$scope', function ($scope) {
        $scope.$watch('date.to', function(value) {
            if (moment(value, 'DD/MM/YYYY').isBefore(moment($scope.date.from, 'DD/MM/YYYY'))) {
                console.log('error');
            }
        });
    }]);

    app.controller('MapCtrl', ['$scope', 'Url', 'Result', function ($scope, Url, Result) {
        $scope.markers = [];
        Result.query({
            from: Url.from,
            to: Url.to,
            lat: Url.lat,
            lng: Url.lng
        }, function (data) {
            $scope.results = data.results;
            $scope.markers = _.map($scope.results, function (result) {
                return {
                    latitude: result.lat,
                    longitude: result.lng,
                    id: result.id
                }
            });
        });
    }]);

    app.controller('ResultsCtrl', ['$scope', 'Url', 'Result', function ($scope, Url, Result) {

        $scope.results = [];
        $scope.filters = [];

        $scope.place = {
            map:{
                center: {
                    latitude: +(Url.lat),
                    longitude: +(Url.lng)
                },
                zoom: 9
            },
            name: Url.place
        };

        $scope.date = {
            from: Url.from,
            to: Url.to
        };

        $scope.start = "start";
        $scope.end = "end";

        $scope.markers = [];

        Result.query({
            from: Url.from,
            to: Url.to,
            lat: Url.lat,
            lng: Url.lng
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
            $scope.markers = _.map($scope.results, function (result) {
                return {
                    latitude: result.lat,
                    longitude: result.lng,
                    idKey: result.id
                }
            });
        });

        $scope.displayFilters = false;

        $scope.filterByFeatures = function (result) {
            return $scope.filters.reduce(function(memo, filter){
                return memo && !(filter.on && result.features.indexOf(filter.name) < 0)
            }, true);
        };


    }]);

    app.directive('editabledatepicker', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                date: "=",
                time: "="
            },
            controller: function ($scope, $element) {
                $scope.displayInput = false;

                $scope.toggleInput = function () {
                    $scope.displayInput = !$scope.displayInput;
                }

                $scope.toPicked = function () {
                    $scope.toggleToInput();
                }
                $scope.timeWording = ($scope.time === "start") ? "du" : "au";
            },
            templateUrl: '/bundles/resorcore/js/templates/editabledatepicker.html',
            replace: true
        };
    });

    app.directive('placeinput', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                place: "="
            },
            controller: function ($scope, $element) {

                $scope.toggleInput = function () {
                    $scope.displayInput = !$scope.displayInput;
                }

                $scope.placeInputOptions = {
                    callback: $scope.toggleInput
                };

            },
            templateUrl: '/bundles/resorcore/js/templates/placeinput.html',
            replace: true
        };
    });

}());
