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

    app.factory('SearchParams', function ($location) {
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
        $routeProvider.when('/:result?', {
            templateUrl: '/bundles/resorcore/js/pages/results.html',
            controller: 'MainCtrl'
        });
    });

    app.controller('MainCtrl', ['$scope', 'SearchParams', 'Result', function ($scope, SearchParams, Result) {
        $scope = _.extend($scope, {
            searchParams: SearchParams
        });
        $scope.results = [];
        $scope.filters = [];

        Result.query($scope.searchParams, function (data) {
            $scope.results = data.results;
            $scope.filters = _.map(data.filters, function (filter) {
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

    app.controller('MapCtrl', ['$scope', '$location', '$anchorScroll', 'Result', function ($scope, $location, $anchorScroll, Result) {

        $scope.map = {
            center: {
                latitude: +($scope.searchParams.lat),
                longitude: +($scope.searchParams.lng)
            },
            zoom: 10
        };

        $scope.markers = {
            data: [],
            markerEvents: {
                click: function (gMarker, eventName, model) {
                    var dest = 'result-' + model.id;
                    $location.hash(dest);
                    $anchorScroll();
                }
            }
        };

        $scope.$watch('results', function(results) {
            $scope.updateMarkers();
        });

        $scope.$watch('filters', function () {
            $scope.updateMarkers();
        }, true);

        $scope.updateMarkers = function () {
            $scope.markers.data = _.map(_.filter($scope.results, function (result) {
                return $scope.filterByFeatures(result);
            }), function (result) {
                return {
                    latitude: result.lat,
                    longitude: result.lng,
                    id: result.id
                };
            });
        }

    }]);

    app.controller('ResultsCtrl', ['$scope', function ($scope) {

        $scope.start = "start";
        $scope.end = "end";
        $scope.displayFilters = false;

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
