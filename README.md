# Bootsoles

Components to aid in quick deployment of mongoose REST applications

### Components

`BootsolesController(model)`: Provides default implementation for common CRUD methods in a rest application.  Available default implentations are:

- `BootsolesController.create()`
- `BootsolesController.read()`
- `BootsolesController.update()`
- `BootsolesController.destroy()`

*Example*
    var MyModel = require('./model.js'); // This is any mongoose model
    var BootsolesController = require('bootsoles').BootsolesController;

    var MyController = {
    	create: function(params, callback) {
    		// Fancy logic of your own
    	},

    	read: BootsolesController(MyModel).read(), // Default read implementation

    	update: BootsolesController(MyModel).update(), // Default update implementation

    	destroy: function(params, callback) {
    		// customs destroy code.
    	}
    }

    module.exports = MyController



`BootsolesRoutes(controller)`: Provides default implementations for common REST calls.  They allow for required extra params as well.

- `BootsolesRoutes.create(requiredParams, paramToModelMap)`
- `BootsolesRoutes.read(requiredParams, paramToModelMap, singleCondition)`
- `BootsolesRoutes.update(requiredParams, paramToModelMap, updateToModelMap)`
- `BootsolesRoutes.destroy(requiredParams, paramToModelMap)`

*Parameters*
- `requiredParams`: A dictionary with values required in any of the following: body, params, query.  Example:
    {
      '_id': 'required'
    }

- `paramToModelMap`: A map from the req object to the mongoose model fields.  For example, you may have a get request where an `_id` resides in the param, but a name resides in the `req.query.name`.  The corresponding object would look like:
    {
      'params._id': '_id',
      'query.name': 'name'
    }

- `singleCondition(req, res)`: an optional condition to decide whether to return a single result or an array of results (can still be an empty array).

- `updateToModelMap`: Similar to `paramToModelMap` but for the fields to be updated.

*Example*
    var MyController = require('./my_controller.js');
    var BootsolesRoutes = require('bootsoles').BootsolesRoutes;

    .
    .
    .

    app.post('/myobject', BootsolesRoutes(MyController).create())
    app.get('/myobject/:_id', BootsolesRoutes(MyController).read(
    	{
    		_id: 'required'
    	},
    	{
    		'params._id': 'myObjectId'
    	}
    	));

