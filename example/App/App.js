require.config({
    baseUrl: '/Scripts',
    paths: {
        "App": "../App",
        "jquery": "../../lib/jquery-1.8.2",
        "knockout": "../../lib/knockout-2.3.0.debug",
        "text": "../../lib/text",
        "ko.widget": "../../dist/ko.widget"
    }
});

// entry point
require(["jquery", "App/Root/Widget"], function ($, RootWidget) {

    $(document).ready(function () {

        var app = new RootWidget();
        app.appendTo($("body"));

    });

});