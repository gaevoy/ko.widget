define(["knockout"], function (ko) {

    return function WindowViewModel() {
        var self = this;
        this.widget = ko.observable(null);

        this.dispose = function () {
            self.widget(null);
        };
    };
});
