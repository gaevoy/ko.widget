define(["knockout", "Widget", "ko.bindings/inject", "ko.bindings/injectAnimation", "ko.bindings/windowInject"], function (ko, Widget, inject) {

    Widget.inject = inject;
    ko.Widget = ko.widget = Widget;
    
    return Widget;
});