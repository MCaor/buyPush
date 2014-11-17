var app = (function($) {
	var exports = {};

	exports.SpaApp = function() {
		this._config = null;
		this._contentElement = null;
	};

	exports.SpaApp.prototype = {
		get config() {
			return this._config;
		},
		get contentElement() {
			return this._contentElement;
		},
		get culture() {
			return $.cookie("app.culture");
		},
		set culture(clt) {
			$.cookie("app.culture", clt);
		},
		startAsync: function() {
			var that = this;
			var deferred = new $.Deferred();

			this.culture = "en-US";

			var configPromise = this.loadAppConfigAsync();
			
			$.when(configPromise).done(
				function(config) {
					that._config = config;
					that._contentElement = $("#content");

					that.navigateToAsync(that.config.ui.defaultScreenId).done(function() {
						deferred.resolve();
					});
				});

			return deferred.promise();
		},

		loadAppConfigAsync: function() {
			return $.getJSON("config/app.json");
		},
		clearContent: function() {
			this.contentElement.empty();
		},
		navigateToAsync: function(id) {
			var that = this;
			var deferred = new $.Deferred();
			var screen = new app.screens.SpaScreen({
				app: this,
				id: id
			});
			screen.loadAsync().done(function(args) {
				that.clearContent();
				that.contentElement.append(args.element);
				deferred.resolve();
			});
			return deferred.promise();
		}
	};
	return exports;
})(jQuery);