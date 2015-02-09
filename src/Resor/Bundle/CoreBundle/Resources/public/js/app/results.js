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
        $scope.filters = [
            {
                name: "pool",
                on: false
            }, {
                name: "animals",
                on: false
            }, {
                name: "spa",
                on: false
            }, {
                name: "jacuzzi",
                on: false
            }
        ];

        $scope.refreshResults = function () {
            Result.query($scope.searchParams, function (data) {
                $scope.results = data.results;
            });
        };

        $scope.filterByFeatures = function (result) {
            return $scope.filters.reduce(function(memo, filter){
                return memo && !(filter.on && result.features.indexOf(filter.name) < 0)
            }, true);
        };

        $scope.updateLocation = function (lat, lng, type) {
            $scope.searchParams.lat = lat;
            $scope.searchParams.lng = lng;
            $scope.searchParams.zoom = type === "country" ? 5 : 10;
        };

        $scope.$watch('[searchParams.from, searchParams.to]', function(params) {
            $scope.refreshResults();
        }, true);

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

        $scope.$watch('[results, filters]', function(results) {
            $scope.updateMarkers();
        }, true);

        $scope.$watch('searchParams', function(newParams, oldParams) {
            if (newParams.lat !== oldParams.lat || newParams.lng !== oldParams.lng) {
                $scope.map.center.latitude = +(newParams.lat);
                $scope.map.center.longitude = +(newParams.lng);
                $scope.map.zoom = +(newParams.zoom);
            }
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
            // transclude: true,
            scope: false,
            controller: function ($scope, $element) {

                $scope.details = {
                    lat: $scope.searchParams.lat,
                    lng: $scope.searchParams.lng,
                };

                $scope.toggleInput = function () {
                    $scope.displayInput = !$scope.displayInput;
                }

                $scope.$watch('details', function(newValue, oldValue, scope) {
                    if ($scope.details.geometry) {
                        $scope.updateLocation($scope.details.geometry.location.k, $scope.details.geometry.location.D,
                            $scope.details.types[0]);
                        $scope.refreshResults();
                    }
                }, true);

                $scope.placeInputOptions = {
                    callback: $scope.toggleInput
                };

            },
            templateUrl: '/bundles/resorcore/js/templates/placeinput.html',
            replace: true
        };
    });

}());
