var Marionette = require('backbone.marionette');

module.exports = Marionette.ItemView.extend({

    template: require('../templates/result.jade'),

    serializeData: function () {
        return _.extend(this.model.toJSON(), {
            pictureUrl: '/uploads/pictures/' + this.model.get('picture_path')
        });
    }

});
