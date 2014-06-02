function Widget(viewModel, view) {
    var self = this;
    var element = null;

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
        if (viewModel.init)
            return viewModel.init.apply(viewModel, arguments);
    };
    this.appendTo = function (elementToAppend) {
        element = elementToAppend;
        var viewElement = $(view);
        element.append(viewElement);
        if (viewModel == null) {
            throw new Error("Widget can not be attached because of viewModel is null");
        }
        ko.applyBindings(viewModel, viewElement[0]);
        if (viewModel.bound) viewModel.bound();
    };
    this.dispose = function () {
        if (element && element[0]) {
            if (viewModel.unbound) viewModel.unbound();
            if (viewModel.dispose) viewModel.dispose();
            ko.cleanNode(element[0]);
            element = null;
        }
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
};

Widget.extend = function (derivedInstance, args) {
    args = (args === undefined) ? [] : args;
    Widget.apply(derivedInstance, args);
};