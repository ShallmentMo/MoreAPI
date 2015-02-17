Apis.ApiController = Ember.ObjectController.extend({
	init: function(){
		if(this.model.id == ""){
			this.set("editing", true);
		}
	},
  actions: {
	  editApi: function() {
			this.set("editing", true);
		},
		cancelApi: function(){
			this.model.rollback();
			this.set("editing", false);
		},
		tryApi: function() {
			$.post("/apis/try/" + this.model.id, function(data){
				console.log(data);
			});
		},
		saveApi: function() {
			var api = this.model;
			var url = api.id == "" ? "/apis/create" : "/apis/save/"
			$.post(url + this.model.id, api.toJSON(), function(data){
				if(api.id == ""){
					api.id = data.api._id;
				}
			});
		}
	},
})

Apis.ApisController = Ember.ArrayController.extend({
	actions: {
		editApi: function(){
		},
		createApi: function(){
			this.store.push("api", {url: "input your url", command: "input your command", title: "input your title", editing: true, id: ""})
		}
	}
});
