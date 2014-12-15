var mongoose = require('mongoose');

var BootsolesController = function(model) {
	return {
		create: function() {
			return function(params, callback) {
				model.create(params, callback);
			}
		},

		read: function() {
			return function(params, callback) {
				model.find(params, callback);
			}
		},

		update: function() {
			return function(params, update, callback) {
				model.update(params, update, callback);
			}
		},

		destroy: function() {
			return function(params, callback) {
				model.destroy(params, callback);
			}
		}
	}
}

module.exports = BootsolesController;