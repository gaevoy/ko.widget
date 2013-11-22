define(["jquery", "knockout", "WindowHost/WindowHostWidget"], function ($, ko, WindowHostWidget) {

    // windowInject: widgetToInject
    ko.bindingHandlers['windowInject'] = {
        'init': function (element, valueAccessor) {
            var windowId = id++;
            var widgetField = valueAccessor();

            ko.computed({
                read: function () {
                    var widget = ko.unwrap(widgetField);

                    ko.dependencyDetection.ignore(function () {
                        windowHost().update(windowId, widget);
                    });
                },
                disposeWhenNodeIsRemoved: element
            });

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                windowHost().remove(windowId);
            });

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

});
