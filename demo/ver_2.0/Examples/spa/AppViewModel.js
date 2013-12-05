define(["knockout", "simrou", "App/HelloWorldWidget/HelloWorldWidget", "App/HelloCompositeWidget/HelloCompositeWidget"], function (ko, Simrou, HelloWorldWidget, HelloCompositeWidget) {

    return function AppViewModel() {
        var self = this;
        this.page = ko.observable(null);

        this.init = function () {
            var router = new Simrou({
                '/hello-world': function () { self.page(new HelloWorldWidget()) },
                '/hello-composite': function () { self.page(new HelloCompositeWidget()) }
            });
            router.start('/hello-world');
        };
    };

});