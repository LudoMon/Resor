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

    var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in dignissim ex. Ut efficitur libero sed ipsum laoreet, a laoreet nunc consequat. Vestibulum mollis quis dui non commodo. Donec nec neque id nulla volutpat maximus. Nulla facilisi. Nullam ultricies lacinia diam, nec consectetur massa congue ac. Phasellus scelerisque at enim sed rhoncus. Ut ut ex leo. Nunc eu libero leo. Phasellus placerat luctus interdum. Duis efficitur laoreet dolor, malesuada rutrum neque congue sit amet. Aliquam semper arcu sapien. Suspendisse diam neque, ullamcorper sed pulvinar nec, tincidunt non mauris. Nulla at sagittis risus. Nullam aliquam, lectus in fermentum blandit, eros risus pellentesque purus, et interdum dolor magna eu arcu.";

    app.controller('ResultCtrl', function ($scope) {
        $scope.results = [
            {
                title: "Camping des flots bleus",
                description: lorem,
                price: "34"

            },
            {
                title: "Camping de l'océan",
                description: lorem,
                price: "27"

            },
            {
                title: "Camping de la plage",
                description: lorem,
                price: "39"

            },
            {
                title: "Camping du soleil",
                description: lorem,
                price: "42"

            },
            {
                title: "Camping Serge",
                description: lorem,
                price: "19"

            }
        ];
    });
}());
