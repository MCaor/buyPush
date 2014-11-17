(function(head) {
	var bootstrap = [
		//Dependencies
		"//code.jquery.com/jquery-2.1.1.min.js",
		"//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js",
		//"//cdnjs.cloudflare.com/ajax/libs/dustjs-linkedin/2.4.0/dust-core.js",
		"lib/dustjs-linkedin/2.5.0/dust-core.min.js",
		"//knockoutjs.com/downloads/knockout-3.2.0.js",
		"js/ui-templates.js",
		"js/SpaApp.js",
		"js/SpaScreen.js",

		//Bootstrap
		function() {
			var spaApp = new app.SpaApp();
			spaApp.startAsync();
		}
	];

	head.load.apply(window, bootstrap);
})(head);