define(["knockout", "App/HelloWorldWidget/HelloWorldWidget"], function (ko, HelloWorldWidget) {

    return function HelloCompositeViewModel() {
        this.helloWorld = ko.observable(new HelloWorldWidget());
        this.title = ko.observable("Hello Composite");
    };

});