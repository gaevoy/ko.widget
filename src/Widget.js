define(["jquery", "knockout"], function ($, ko) {
    function Widget(viewModel, view) {
        var self = this;
        var element = null;
        var disposed = false;

        this.setTemplate = function (name, template) {
            var re = new RegExp("(<!--" + name + "Template-->[ \r\n]*)((.|\r|\n)*?)([ \r\n]*<!--/" + name + "Template-->)", "g");
            view = view.replace(re, "$1" + template + "$4");
        };
        this.exportMethods = function () {
            var methodNames = arguments;
            for (var i = 0; i < methodNames.length; i++) {
                var methodName = methodNames[i];
                if (viewModel != undefined && viewModel[methodName] !== undefined) {
                    self[methodName] = viewModel[methodName];
                }
            }
        };
        this.init = function () {
            if (viewModel && viewModel.init) {
                return viewModel.init.apply(viewModel, arguments);
            }
        };
        this.appendTo = function (elementToAppend) {
            element = elementToAppend;
            setDebugInformation();
            ensureBindingsAppliedJQuery();
        };
        this.dispose = function () {
            if (viewModel && viewModel.dispose) {
                viewModel.dispose();
            }
            if (element && element[0]) {
                ko.cleanNode(element[0]);
                element = null;
            }
            viewModel = null;
            view = null;
            disposed = true;
        };

        this.settings = function (object) {
            if (!!!object) return;
            for (var key in object) {
                if (object.hasOwnProperty(key)) {
                    if (/.*\.settings$/.test(key)) {
                        var field = viewModel[key.replace(".settings", "")];
                        field().settings(object[key]);
                    } else {
                        var field = viewModel[key];
                        if (field) {
                            field(object[key]);
                        }
                    }
                }
            }
        };

        function ensureBindingsAppliedJQuery() {
            var viewElement = $(view);
            element.append(viewElement);
            if (viewModel != null) {
                ko.applyBindings(viewModel, viewElement[0]);
            }
        }
        function getFunctionName(func) {
            if (func.name) {
                return func.name;
            }
            var definition = func.toString().split("\n")[0];
            var exp = /^function ([^\s(]+).+/;
            if (exp.test(definition)) {
                return definition.split("\n")[0].replace(exp, "$1") || null;
            } else {
                return null;
            }
        }
        function setDebugInformation() {
            var widgetName = getFunctionName(self.constructor) || "unknown";
            if (widgetName != null && element) {
                element.attr("data-widget", widgetName);
            }
        }
    };

    Widget.extend = function (derivedInstance, args) {
        args = (args === undefined) ? [] : args;
        Widget.apply(derivedInstance, args);
    };

    return Widget;
});