(function ($, top, GMaps) {

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

}(jQuery, window, GMaps));
