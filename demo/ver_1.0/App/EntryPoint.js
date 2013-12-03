require.config({
    baseUrl: '/demo/ver_1.0/Scripts',
    paths: {
        "App": "../App"
    }
});

// entry point
require(["jquery", "App/Root/Widget"], function ($, RootWidget) {
	
	$(document).ready(function () {
	
	    var app = new RootWidget();
		app.appendTo($("body"));
		
	});

});