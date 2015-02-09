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

    app.controller('MainCtrl', ['$scope', 'SearchParams', function ($scope, SearchParams) {
        $scope = _.extend($scope, {
            searchParams: SearchParams
        });
        $scope.results = [];

        $scope.updateResults = function (results) {
            $scope.results = results;
        }
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
            $scope.markers.data = _.map(results, function (result) {
                return {
                    latitude: result.lat,
                    longitude: result.lng,
                    id: result.id
                }
            });
        });

    }]);

    app.controller('ResultsCtrl', ['$scope', 'Result', function ($scope, Result) {

        $scope.filters = [];

        $scope.start = "start";
        $scope.end = "end";

        Result.query($scope.searchParams, function (data) {
            $scope.updateResults(data.results);
            $scope.filters = _.map(_.reduce(_.map(data.results, function (result) {
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
