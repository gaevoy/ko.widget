define(["jquery", "knockout", "../widgetFor"], function ($, ko, widgetFor) {

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
    }

    return inject;

});
