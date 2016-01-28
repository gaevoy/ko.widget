function Widget(viewModel, view) {
    var self = this;
    var element = null;

    this.exportMethods = function () {
        var methodNames = arguments;
        for (var i = 0; i < methodNames.length; i++) {
            var methodName = methodNames[i];
            if (viewModel && viewModel[methodName]) {
                self[methodName] = viewModel[methodName];
            }
        }
    };
    this.init = function () {
        if (viewModel.init)
            return viewModel.init.apply(viewModel, arguments);
    };
    this.appendTo = function (elementToAppend) {
        element = $(elementToAppend);
        var viewElement = $(view);
        element.append(viewElement);
        if (viewModel == null) throw new Error("Widget can not be attached because of viewModel is null");
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
};

Widget.extend = function (derivedInstance, args) {
    Widget.apply(derivedInstance, args);
};