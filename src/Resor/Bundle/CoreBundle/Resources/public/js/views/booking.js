var Marionette = require('backbone.marionette');
var OffersView = require('../views/offers');

module.exports = Marionette.ItemView.extend({

    template: require('../templates/booking.jade'),

    ui: {
        fromInput: '.js-from-input',
        toInput: '.js-to-input',
        fromForm: '.js-form-from',
        toForm: '.js-form-to',
        mapPlaceholder: '.js-map',
        price: '.js-price',
        offers: '#offers',
        form: '.js-form'
    },

    initialize: function (options) {
        this.searchParams = options.searchParams;
        this.offers = new OffersView({
            collection: options.offers,
            searchParams: options.searchParams,
            booking: this.model
        });
    },

    modelEvents: {
        'change:days': 'updatePrice',
        'change:dailyPrice': 'updatePrice',
        'change:availabilityId': 'onAvailabilityChange'
    },

    onRender: function () {

        var view = this;

        this.ui.offers.html(this.offers.render().$el);

        function updateDateFormInputs() {
            view.ui.fromForm.attr('value', moment(view.model.get('from'), 'DD/MM/YYYY').format());
            view.ui.toForm.attr('value', moment(view.model.get('to'), 'DD/MM/YYYY').format());
        }

        function updateDates () {
            var toDate = view.toPicker.getDate();
            var fromDate = view.fromPicker.getDate();
            var daysDifference = moment(toDate).diff(moment(fromDate), 'days');
            view.searchParams.set('to', moment(toDate));
            view.searchParams.set('from', moment(fromDate));
            view.model.set('days', daysDifference);
            view.fromPicker.setMaxDate(moment(toDate).subtract(1, 'days'));
            view.toPicker.setMinDate(moment(fromDate).add(1, 'days'));
            updateDateFormInputs();
            window.history.replaceState({}, '', window.location.pathname + '?from=' + moment(fromDate).format('DD/MM/YYYY') + '&to=' + moment(toDate).format('DD/MM/YYYY'));
        }

        this.fromPicker = new Pikaday({
            field: this.ui.fromInput[0],
            format: 'DD/MM/YYYY',
            maxDate: moment(this.model.get('to')).subtract(1, 'days'),
            onSelect: updateDates
        });

        this.toPicker = new Pikaday({
            field: this.ui.toInput[0],
            format: 'DD/MM/YYYY',
            minDate: moment(this.model.get('from')).add(1, 'days'),
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

    onAvailabilityChange: function () {
        var url = "/book/" + this.model.get('bookingId') + "/finalize/" + this.model.get('availabilityId');
        this.ui.form.attr('action', url);
    }

});
