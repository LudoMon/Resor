var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({

    template: require('../templates/booking.jade'),

    ui: {
        fromInput: '.js-from-input',
        toInput: '.js-to-input',
        fromForm: '.js-form-from',
        toForm: '.js-form-to',
        mapPlaceholder: '.js-map',
        price: '.js-price'
    },

    initialize: function (options) {
        this.model.set('dailyPrice', 27);
    },

    modelEvents: {
        'change:days': 'updatePrice'
    },

    onRender: function () {

        var view = this;

        function updateDateFormInputs() {
            view.ui.fromForm.attr('value', moment(view.model.get('from')).format());
            view.ui.toForm.attr('value', moment(view.model.get('to')).format());
        }

        function updateDates () {
            var toDate = view.toPicker.getDate();
            var fromDate = view.fromPicker.getDate();
            var daysDifference = moment(toDate).diff(moment(fromDate), 'days');
            view.model.set('to', toDate);
            view.model.set('from', fromDate);
            view.model.set('days', daysDifference);
            view.fromPicker.setMaxDate(toDate);
            view.toPicker.setMinDate(fromDate);
            updateDateFormInputs();
        }

        this.fromPicker = new Pikaday({
            field: this.ui.fromInput[0],
            format: 'DD/MM/YYYY',
            maxDate: this.model.get('from'),
            onSelect: updateDates
        });

        this.toPicker = new Pikaday({
            field: this.ui.toInput[0],
            format: 'DD/MM/YYYY',
            minDate: this.model.get('to'),
            onSelect: updateDates
        });
        this.fromPicker.setMoment(moment(window.exposed.from, 'DD/MM/YYYY'));
        this.toPicker.setMoment(moment(window.exposed.to, 'DD/MM/YYYY'));

        updateDateFormInputs();
    },

    updatePrice: function () {
        var price;
        price = this.model.get('days') * this.model.get('dailyPrice');
        price = price > 0 ? price : '--';
        this.model.set('price', price);
        this.ui.price.html(this.model.get('price') + ' €');
    },

});
