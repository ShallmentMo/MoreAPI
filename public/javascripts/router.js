	Apis.Router.map(function(){
		this.resource("apis", {path: '/'});
	})

	Apis.ApisRoute = Ember.Route.extend({
		model: function(){
			return this.store.find('api');
		}
	})
