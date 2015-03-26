var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({

    template: require('../templates/booking.jade'),

    ui: {
        fromInput: '.js-from-input',
        toInput: '.js-to-input',
    },

    onRender: function () {

        var view = this;

        function updateDates () {
            var toDate = view.toPicker.getDate();
            var fromDate = view.fromPicker.getDate();
            var daysDifference = moment(a).diff(moment(b), 'days');
            view.model.set('to', toDate);
            view.model.set('from', fromDate);
            view.model.set('days', daysDifference);
            view.fromPicker.setMaxDate(toDate);
            view.toPicker.setMinDate(fromDate);
            view.updatePrice();
        }

        this.fromPicker = new Pikaday({
            field: this.ui.fromInput[0],
            format: 'DD/MM/YYYY',
            maxDate: this.model.get('from'),
            onSelect: updateDates,
            disableDayFn: function () {
                debugger;
                return true;
            }
        });

        this.toPicker = new Pikaday({
            field: this.ui.toInput[0],
            format: 'DD/MM/YYYY',
            minDate: this.model.get('to'),
            onSelect: updateDates
        });

        // this.fromPicker.setMoment(moment(window.exposed.from, 'DD/MM/YYYY'));
        // this.toPicker.setMoment(moment(window.exposed.to, 'DD/MM/YYYY'));
    },

    updatePrice: function () {
        this.$('.booking-price').html(this.model.get('days') * 27 + ' €');
    }

});
