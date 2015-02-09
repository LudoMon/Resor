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

        $scope.start = "start";
        $scope.end = "end";

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
            template:   '<div>' +
                        '<span ng-show="!displayInput">' +
                            '{{ timeWording }} <strong ng-click="toggleInput()">' +
                                '{{ date }} <i class="fa fa-pencil"></i>' +
                            '</strong>' +
                        '</span>'+
                        '<input class="primary-input" pikaday="fromDate" format="DD/MM/YYYY" ng-sho' +
                        'w="displayInput" set-default-date="true" ng-model="date"' +
                        'max-date="date.to" ng-blur="toggleInput()" validate-to-date>' +
                        '</div>',
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
            template: '<div>' +
                      '<strong ng-show="!displayInput" ng-click="toggleInput()">{{ place }} <i class="fa fa-pencil"></i></strong>' +
                      '<input class="primary-input" type="text" id="place-autocomplete" ng-show="displayInput" ng-autocomplete ng-model="place"' +
                      ' options="placeInputOptions"></div>',
            replace: true
        };
    });

}());
