define(["jquery", "knockout"], function ($, ko) {

    ko.Widget = function Widget() {
        //#region private fields
        var self = this;
        var bindingsApplied = false;
        //#endregion

        //#region public fields
        this.viewModel = null;
        this.view = null;
        this.element = null;
        this.disposed = false;
        //#endregion

        //#region public methods
        this.setTemplate = function (name, template) {
            var re = new RegExp("(<!--" + name + "Template-->[ \r\n]*)(.*)([ \r\n]*<!--/" + name + "Template-->)", "");
            self.view = self.view.replace(re, "$1" + template + "$3");
        };
        this.init = function () {
            if (self.viewModel && self.viewModel.init) {
                self.viewModel.init.apply(self.viewModel, arguments);
            }
        };
        this.appendTo = function (element) {
            if (self.element || self.disposed) {
                throw new Error("Widget already appended. Only one time you can append control to the container");
            }
            self.element = element;
            ensureBindingsApplied(element);
        };
        this.dispose = function () {
            if (self.viewModel && self.viewModel.dispose) {
                self.viewModel.dispose.apply(self.viewModel);
            }
            self.element = null;
            self.viewModel = null;
            self.view = null;
        };
        //#endregion

        //#region private methods
        function ensureBindingsApplied(element) {
            if (bindingsApplied == false) {
                bindingsApplied = true;
                var viewElement = $(self.view);
                if (self.viewModel != null) {
                    ko.applyBindings(self.viewModel, viewElement[0]);
                }
                element.append(viewElement);
            }
        }
        //#endregion
    };

    // inject: widgetToInject
    ko.bindingHandlers['inject'] = {
        'init': function (element, valueAccessor) {
            var widgetToInject = valueAccessor();
            var currentWidget = null;
            ko.computed(function () {
                var $container = $(element);
                // remove previous
                if (currentWidget) {
                    currentWidget.dispose();
                }
                ko.cleanNode($container[0]);
                $container.empty();

                currentWidget = widgetToInject();
                if (currentWidget != null) {
                    currentWidget.appendTo($container);
                }
            });
            return { controlsDescendantBindings: true };
        }
    };

});
