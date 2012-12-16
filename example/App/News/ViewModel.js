define(["knockout"], function (ko) {

    return function ViewModel(title) {
        this.title = ko.observable(title + " News");
    };

});
