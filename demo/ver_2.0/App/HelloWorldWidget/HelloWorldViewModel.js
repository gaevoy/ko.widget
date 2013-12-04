define(["knockout"], function (ko) {

    return function HelloWorldViewModel() {
        this.title = ko.observable("Hello World");
    };

});