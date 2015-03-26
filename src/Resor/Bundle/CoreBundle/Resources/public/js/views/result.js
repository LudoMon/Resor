var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({

    template: require('../templates/result.jade'),

    initialize: function (options) {
        this.searchParams = options.searchParams;
        this.listenTo(this.searchParams, 'change', this.render);
    },

    serializeData: function () {
        return _.extend(this.model.toJSON(), {
            link: '/book/' + this.model.get('id') + '?from=' + this.searchParams.get('from') + '&to=' + this.searchParams.get('to')
        });
    }

});
