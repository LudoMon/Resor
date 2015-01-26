(function ($, top) {

    $(function () {
        var placeInput = $('.js-place-input'),
            fromInput = $('.js-from-input'),
            toInput = $('.js-to-input');

        placeInput.geocomplete();

        $.each([fromInput, toInput], function (i, input) {
            input.datetimepicker({
                lang: 'fr',
                timepicker: false,
                minDate: 0,
                format: 'd/m/Y'
            });
        });

    });

}(jQuery, window));
