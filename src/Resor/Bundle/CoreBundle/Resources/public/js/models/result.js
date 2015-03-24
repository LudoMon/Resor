var Backbone = require('backbone');

module.exports = Backbone.Model.extend({

    isActive: function (activatedFeatures) {
        return _.isEmpty(_.difference(activatedFeatures, this.get('features')));
    }

});
