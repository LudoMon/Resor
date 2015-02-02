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
    var app = angular.module("resultsApp", []);

    app.filter("capitalize", function () {
        return function (s) {
            return s[0].toUpperCase() + s.slice(1);
        };
    });

    var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in dignissim ex. Ut efficitur libero sed ipsum laoreet, a laoreet nunc consequat. Vestibulum mollis quis dui non commodo. Donec nec neque id nulla volutpat maximus. Nulla facilisi. Nullam ultricies lacinia diam, nec consectetur massa congue ac. Phasellus scelerisque at enim sed rhoncus. Ut ut ex leo. Nunc eu libero leo. Phasellus placerat luctus interdum. Duis efficitur laoreet dolor, malesuada rutrum neque congue sit amet. Aliquam semper arcu sapien. ";

    app.controller('ResultCtrl', function ($scope) {
        $scope.results = [
            {
                title: "Camping des flots bleus",
                description: lorem,
                price: "34",
                features: ["pool", "animals", "spa", "jacuzzi"]

            },
            {
                title: "Camping de l'océan",
                description: lorem,
                price: "27",
                features: ["spa", "jacuzzi"]

            },
            {
                title: "Camping de la plage",
                description: lorem,
                price: "39",
                features: ["pool", "spa", "jacuzzi"]

            },
            {
                title: "Camping du soleil",
                description: lorem,
                price: "42",
                features: ["pool", "animals"]

            },
            {
                title: "Camping Serge",
                description: lorem,
                price: "19",
                features: ["spa", "jacuzzi"]

            }
        ];

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

        $scope.filterByFeatures = function (result) {
            return $scope.filters.reduce(function(memo, filter){
                return memo && !(filter.on && result.features.indexOf(filter.name) < 0)
            }, true);
        };

    });
}());
