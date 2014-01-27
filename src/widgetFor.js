define(["knockout"], function (ko) {

    var widgetForDomDataKey = "__ko_widget__";
    return function widgetFor(element, value) {
        if (arguments.length == 2)
            ko.utils.domData.set(element, widgetForDomDataKey, value);
        else
            return ko.utils.domData.get(element, widgetForDomDataKey);
    };

});