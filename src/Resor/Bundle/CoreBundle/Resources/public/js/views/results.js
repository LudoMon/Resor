var Marionette = require('backbone.marionette');

module.exports = Marionette.CollectionView.extend({

    childView: require('./result')

});
