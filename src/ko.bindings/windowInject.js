define(["jquery", "knockout", "WindowHost/WindowHostWidget", "../widgetFor"], function ($, ko, WindowHostWidget, widgetFor) {

    // windowInject: widgetToInject
    ko.bindingHandlers['windowInject'] = {
        'init': function (element, valueAccessor) {
            windowInject(element, valueAccessor());
            return { controlsDescendantBindings: true };
        }
    };

    var id = 1;
    var windowHostSingleton = null;
    function windowHost() {
        if (!windowHostSingleton) {
            windowHostSingleton = new WindowHostWidget();
            windowHostSingleton.appendTo($("body"));
            windowHostSingleton.init();
        }
        return windowHostSingleton;
    }

    function windowInject(element, observableWidget) {
        var windowId = id++;
        ko.computed({
            read: function () {
                var widget = ko.unwrap(observableWidget);

                ko.dependencyDetection.ignore(function () {
                    windowHost().update(windowId, widget);
                    widgetFor(element, widget);
                });
            },
            disposeWhenNodeIsRemoved: element
        });

        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            windowHost().remove(windowId);
            widgetFor(element, null);
        });
    }

    return windowInject;

});
