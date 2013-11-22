
define('Widget',["jquery", "knockout"], function ($, ko) {
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
define('ko.bindings/inject',["jquery", "knockout"], function ($, ko) {

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
            }

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
        });
    };

    return inject;

});

define('ko.bindings/injectAnimation',["jquery", "knockout", "./inject"], function ($, ko) {

    // inject: widgetToInject
    ko.bindingHandlers['injectAnimation'] = {
        'update': function (element, valueAccessor) {
            $(element).data("injectAnimation", ko.unwrap(valueAccessor()));
        },
        'animations': {
            'none': function (prevElement, nextElement) {
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
        var injectAnimation = containerElement.data("injectAnimation");
        if (injectAnimation) {
            var transition = ko.bindingHandlers['injectAnimation']['animations'][injectAnimation];
            if (transition) {
                transition(prevElement, nextElement);
            }
        }
    };

});

define('WindowHost/WindowViewModel',["knockout"], function (ko) {

    return function WindowViewModel() {
        var self = this;
        this.widget = ko.observable(null);

        this.dispose = function () {
            self.widget(null);
        };
    };
});

define('WindowHost/WindowHostViewModel',["knockout", "./WindowViewModel"], function (ko, WindowViewModel) {

    return function WindowHostViewModel() {
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
});

define('text!WindowHost/WindowView.htm',[],function () { return '<div class="window-host" data-bind="foreach: windows">\r\n    <div data-bind="inject: widget">\r\n    </div>\r\n</div>\r\n';});

define('WindowHost/WindowHostWidget',["Widget", "WindowHost/WindowHostViewModel", "text!WindowHost/WindowView.htm"], function (Widget, WindowHostViewModel, WindowView) {

    return function WindowHostWidget() {
        Widget.extend(this, [new WindowHostViewModel, WindowView]);

        this.exportMethods("update", "remove");
    };

});
define('ko.bindings/windowInject',["jquery", "knockout", "WindowHost/WindowHostWidget"], function ($, ko, WindowHostWidget) {

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

define('ko.widget',["knockout", "Widget", "ko.bindings/inject", "ko.bindings/injectAnimation", "ko.bindings/windowInject"], function (ko, Widget, inject) {

    Widget.inject = inject;
    ko.Widget = ko.widget = Widget;
    
    return Widget;
});