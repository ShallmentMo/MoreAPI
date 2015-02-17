	window.Apis = Ember.Application.create();

	Apis.ApplicationSerializer = DS.RESTSerializer.extend({
	  primaryKey: "_id"
	});
