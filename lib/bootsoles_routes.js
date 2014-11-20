var utils = require('./utils');
var validate = require('petemertz-express-validator');

var BootsolesRoutes = function(controller) {
	return {
		create: function(validationParams, paramToModelMap) {
			validationParams = validationParams ? validationParams : {};
			paramToModelMap = paramToModelMap ? paramToModelMap : {};

			return function(req, res) {
				var params = {};
				for (var key in paramToModelMap) {
					if (paramToModelMap[key] == "*") {
						params = utils.extendedDictionaryGet(key, req);
						break;
					} else {
						params[paramToModelMap[key]] = utils.extendedDictionaryGet(key, req);
					}
				}

				if (validate(
						validationParams,
						req, res)) {
					controller.create(
						params,
						function(error, results) {
							if (error) {
								res.json({
									error: error
								});
								return;
							}
							res.json(results);
						})
				}
			}
		},

		read: function(validationParams, paramToModelMap, singleCondition) {
			validationParams = validationParams ? validationParams : {};
			paramToModelMap = paramToModelMap ? paramToModelMap : {};

			if (singleCondition == undefined) {
				singleCondition = false;
			}

			return function(req, res) {
				var params = {};
				for (var key in paramToModelMap) {
					if (paramToModelMap[key] == "*") {
						params = utils.extendedDictionaryGet(key, req);
						break;
					} else {
						params[paramToModelMap[key]] = utils.extendedDictionaryGet(key, req);
					}
				}

				if (validate(
						validationParams,
						req, res)) {
					controller.read(
						params,
						function(error, results) {
							if (error) {
								res.json({
									error: error
								});
								return;
							}

							if (singleCondition(req, res)) {
								res.json(results[0]);
							} else {
								res.json(results);
							}
						}
					);
				}
			}
		},

		update: function(validationParams, paramToModelMap, updateToModelMap) {
			validationParams = validationParams ? validationParams : {};
			paramToModelMap = paramToModelMap ? paramToModelMap : {};
			updateToModelMap = updateToModelMap ? updateToModelMap : {};

			return function(req, res) {
				var params = {};
				for (var key in paramToModelMap) {
					if (paramToModelMap[key] == "*") {
						params = utils.extendedDictionaryGet(key, req);
						break;
					} else {
						params[paramToModelMap[key]] = utils.extendedDictionaryGet(key, req);
					}
				}

				var update = {};
				for (var key in updateToModelMap) {
					if (updateToModelMap[key] == "*") {
						update = utils.extendedDictionaryGet(key, req);
						break;
					} else {
						update[updateToModelMap[key]] = utils.extendedDictionaryGet(key, req);
					}
				}


				if (validate(
						validationParams,
						req, res)) {
					controller.update(
						params,
						update,
						function(error, results) {
							if (error) {
								res.json({
									error: error
								});
								return;
							}

							res.json({
								success: true
							});
						})
				}
			}
		},

		destroy: function(validationParams, paramToModelMap) {
			validationParams = validationParams ? validationParams : {};
			paramToModelMap = paramToModelMap ? paramToModelMap : {};

			return function(req, res) {
				var params = {};
				for (var key in paramToModelMap) {
					if (paramToModelMap[key] == "*") {
						params = utils.extendedDictionaryGet(key, req);
						break;
					} else {
						params[paramToModelMap[key]] = utils.extendedDictionaryGet(key, req);
					}
				}

				if (validate(
						validationParams,
						req, res)) {
					controller.destroy(
						params,
						function(error, results) {
							if (error) {
								res.json({
									error: error
								});
								return;
							}

							res.json(results);
						})
				}
			}
		}
	}
}

module.exports = BootsolesRoutes;