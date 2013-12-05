require(["jquery", "App/HelloCompositeWidget/HelloCompositeWidget", "domReady!"], function ($, HelloCompositeWidget) {

    var app = new HelloCompositeWidget();
    app.appendTo($("body"));

});