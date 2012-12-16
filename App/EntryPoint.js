require.config({
    baseUrl: '/ko.widget/Scripts',
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