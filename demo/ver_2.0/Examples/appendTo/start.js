require(["jquery", "App/HelloWorldWidget/HelloWorldWidget", "domReady!"], function ($, HelloWorldWidget) {

    var app = new HelloWorldWidget();
    app.appendTo($("body"));

});