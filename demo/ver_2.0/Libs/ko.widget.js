(function (factory) {
if (typeof define === 'function' && define.amd) {
    define(['knockout', 'jquery'], factory);
} else {
    factory(ko, jQuery);
}
}(function (ko, $) {




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
var widgetForDomDataKey = "__ko_widget__";
function widgetFor(element, value) {
    if (arguments.length == 2)
        ko.utils.domData.set(element, widgetForDomDataKey, value);
    else
        return ko.utils.domData.get(element, widgetForDomDataKey);
};
// inject: widgetToInject
ko.bindingHandlers['inject'] = {
    'init': function (element, valueAccessor) {
        inject(element, valueAccessor());
        return { controlsDescendantBindings: true };
    },
    'transition': function (prevElement, nextElement, containerElement) {
        if (prevElement) {
            prevElement.remove();
        }
    }
};

function inject(element, observableWidget) {
    function change(widget) {
        if (current) {
            current.dispose();
        }
        var nextEl = null;
        current = widget;
        if (current) {
            nextEl = $('<div class="widget"></div>');
            nextEl.appendTo(containerEl);
            current.appendTo(nextEl);
            setDebugInformation(nextEl, current);
        }
        widgetFor(element, current);

        var prevEl = nextEl ? nextEl.prev() : containerEl.children().last();
        ko.bindingHandlers['inject']['transition'](prevEl, nextEl, containerEl);
    }

    var containerEl = $(element);
    var current = null;
    var subscription = null;
    change(ko.unwrap(observableWidget));
    if (ko.isObservable(observableWidget)) {
        subscription = observableWidget.subscribe(change);
    }
    ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
        if (subscription) {
            subscription.dispose();
        }
        if (current) {
            current.dispose();
        }
        widgetFor(element, null);
    });
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
function setDebugInformation($el, widget) {
    if ($el) {
        $el.attr("data-widget", getFunctionName(widget.constructor) || "unknown");
    }
};
function WindowViewModel() {
    var self = this;
    this.widget = ko.observable(null);

    this.dispose = function () {
        self.widget(null);
    };
};
function WindowHostViewModel() {
    var self = this;
    var KEY_PREFIX = "wnd";
    var windowById = {};

    this.windows = ko.observableArray([]);

    this.update = function (id, widget) {
        var wnd = windowById[KEY_PREFIX + id];
        if (!wnd) {
            wnd = new WindowViewModel(id);
            windowById[KEY_PREFIX + id] = wnd;
            self.windows.push(wnd);
        }
        wnd.widget(widget);
    };
    this.remove = function (id) {
        var wnd = windowById[KEY_PREFIX + id];
        if (wnd) {
            wnd.dispose();
            self.windows.remove(wnd);
        }
    };
};
function WindowHostWidget() {
    Widget.extend(this, [new WindowHostViewModel, '<div class="window-host" data-bind="foreach: windows"><div data-bind="inject: widget"></div></div>']);

    this.exportMethods("update", "remove");
};
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
};
function registerBinding(Widget, bindingName, handlers) {
    if (ko.bindingHandlers[bindingName]) {
        throw new Error("Binding conflict. Binding '" + bindingName + "' is already exist");
    }

    ko.bindingHandlers[bindingName] = {
        'init': function (element, valueAccessor) {
            var widget = new Widget();
            if (handlers && handlers.windowInject == true) {
                windowInject(element, widget);
            } else {
                inject(element, widget);
            }
            if (handlers && handlers.init) {
                handlers.init(widget, valueAccessor);
            }

            return { controlsDescendantBindings: true };
        },
        'update': function (element, valueAccessor) {
            var widget = widgetFor(element);
            if (handlers && handlers.update) {
                handlers.update(widget, valueAccessor);
            }
            if (!(handlers && (handlers.init || handlers.update))) {
                var options = ko.toJS(valueAccessor());

                ko.dependencyDetection.ignore(function () {
                    widget.init(options);
                });
            }
        }
    };

};
// injectAnimation: 'fadeIn'
ko.bindingHandlers['injectAnimation'] = {
    'update': function (element, valueAccessor) {
        $(element).data("injectAnimation", ko.unwrap(valueAccessor()));
    },
    'animations': {
        'default': function (prevElement, nextElement) {
            if (prevElement) {
                prevElement.remove();
            }
        },
        'fadeIn': function (prevElement, nextElement) {
            if (prevElement) {
                prevElement.remove();
            }
            if (prevElement && nextElement) {
                nextElement.hide().fadeIn();
            }
        }
    }
};

ko.bindingHandlers['inject']['transition'] = function (prevElement, nextElement, containerElement) {
    var injectAnimation = containerElement.data("injectAnimation") || "default";
    if (injectAnimation) {
        var transition = ko.bindingHandlers['injectAnimation']['animations'][injectAnimation];
        if (transition) {
            transition(prevElement, nextElement);
        }
    }
};
Widget.inject = inject;
Widget.windowInject = windowInject;
Widget.registerBinding = registerBinding;
ko.Widget = ko.widget = Widget;
ko.widgetFor = widgetFor;

return ko.widget;
}));