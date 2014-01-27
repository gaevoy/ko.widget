define(["knockout", "Widget", "ko.bindings/inject", "ko.bindings/windowInject", "registerBinding", "widgetFor", "ko.bindings/injectAnimation"], function (ko, Widget, inject, windowInject, registerBinding, widgetFor) {

    Widget.inject = inject;
    Widget.windowInject = windowInject;
    Widget.registerBinding = registerBinding;
    ko.Widget = ko.widget = Widget;
    ko.widgetFor = widgetFor;

    return Widget;
});