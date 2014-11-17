(function(app, dust, ko, $) {
	app.screens = {};

	app.screens.SpaScreen = function(args) {
		if(!args.hasOwnProperty("app")) {
			throw Error("'app' is required");
		}

		if(!args.hasOwnProperty("id")) {
			throw Error("'id' is required");
		}

		this._app = args.app;
		this._id = args.id;
	};

	app.screens.SpaScreen.prototype = {
		get app() {
			return this._app;
		},
		get id() {
			return this._id;
		},
		loadAsync: function(args) {
			var that = this;
			var deferred = new $.Deferred();

			$.getJSON("resources/" + this.id + "Screen." + this._app.culture + ".json")
				.done(function(resources) {
					dust.render("app_views_" + that.id, {
						resources: resources
					}, function(err, text) {
						var screenElement = $(text);

						if (typeof args !== "undefined" && args.hasOwnProperty("viewModel")) {
							ko.applyBindings(args.viewModel, screenElement[0]);
						}

						deferred.resolve({
							element: screenElement
						});
					});
				});

			return deferred.promise();
		}
	};
})(app, dust, ko, jQuery);