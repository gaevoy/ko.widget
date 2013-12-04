define(["knockout", "App/HelloWorldWidget/HelloWorldWidget"], function (ko, HelloWorldWidget) {

    return function AppViewModel() {
        this.helloWorld = ko.observable(new HelloWorldWidget());
    };

});