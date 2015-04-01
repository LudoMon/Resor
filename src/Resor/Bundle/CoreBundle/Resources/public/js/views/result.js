var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({

    template: require('../templates/result.jade'),

    initialize: function (options) {
        this.searchParams = options.searchParams;
        this.listenTo(this.searchParams, 'change', this.render);
    },

    serializeData: function () {
        var dateLimits = this.searchParams.getDateLimits();
        return _.extend(this.model.toJSON(), {
            hasPicture: this.model.get('picture_path'),
            link: '/book/' + this.model.get('id') + '?from=' + this.searchParams.get('from') + '&to=' + this.searchParams.get('to'),
            pictureUrl: '/uploads/pictures/' + this.model.get('picture_path'),
            minPrice: this.model.getMinPrice(dateLimits.from, dateLimits.to) * this.searchParams.getDuration()
        });
    }

});
