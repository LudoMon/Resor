(function ($, top) {

    $(function () {
        var placeInput = $('.js-place-input'),
            fromInput = $('.js-from-input'),
            toInput = $('.js-to-input'),
            inputs = [placeInput, fromInput, toInput],
            submitButton = $('.js-submit'),
            form = $('.js-form'),
            datetimepickerOptions = {
                lang: 'fr',
                timepicker: false,
                minDate: 0,
                format: 'd/m/Y'
            };

        function checkInvalidInputs () {
            var invalidInput;
            $.each(inputs.slice().reverse(), function (index, input) {
                if (!input.val()) {
                    invalidInput = input;
                }
            })
            return invalidInput;
        }

        placeInput.geocomplete();

        submitButton.on('click', function (evt) {
            var invalidInput;

            evt.preventDefault();
            evt.stopPropagation();
            if (invalidInput = checkInvalidInputs()) {
                invalidInput.focus();
                return false;
            }
            form.submit();
            return true;
        })

        $.each([fromInput, toInput], function (index, input) {
            input.datetimepicker({
                lang: 'fr',
                timepicker: false,
                minDate: 0,
                format: 'd/m/Y',
                onShow: function () {
                    var minDate = (input === toInput) ? (fromInput.val() ? fromInput.val() : false) : false;
                    var maxDate = (input === fromInput) ? (toInput.val() ? toInput.val() : false) : false;
                    this.setOptions({
                        minDate: minDate,
                        maxDate: maxDate,
                        formatDate: 'd/m/Y'
                    });
                },
                closeOnDateSelect: true,
                timepicker: false
            });
        });

        $.each(inputs, function (index, input) {
            // Pass to next input when validating
            input.on('change', function (evt) {
                if (input.val() && index < inputs.length - 1) {
                    inputs[index + 1].focus();
                }
            })
        });

    });

}(jQuery, window));
