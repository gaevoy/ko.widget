define(["jquery", "knockout"], function ($, ko) {

    // inject: controlToInject
    ko.bindingHandlers['inject'] = {
        'init': function (element, valueAccessor, allBindings) {
            var injectAnimation = allBindings().injectAnimation || "none";
            var widgetToInject = valueAccessor();
            var currentWidget = null;
            var $container = $(element);

            // do not use this ko.computed because of problem with strange behaviour to subscribes on field was not used inside, as result windowInject is affected don't now why
            function widgetChanged(widgetToInject) {
                // clear blocks which is still being animated
                var children = $container.children();
                if (children.length > 1) {
                    for (var i = 0; i < children.length; i++) {
                        ko.cleanNode(children[i]);
                        $(children[i]).remove();
                    }
                    children = [];
                }

                // remove previous
                if (currentWidget) {
                    currentWidget.dispose();
                    currentWidget = null;
                }
                var prevWidgetElement = children[0] || null;
                if (prevWidgetElement) {
                    ko.cleanNode(prevWidgetElement); // clear garbage into delayed excecution because of performance really bad idea because $(element).data('blabla') will be empty
                }

                // add new one
                var nextWidgetElement = null;
                currentWidget = widgetToInject;
                if (currentWidget != null && currentWidget.appendTo) {
                    var $nextWidgetElement = $('<div class="widget"></div>');
                    $nextWidgetElement.appendTo($container);
                    currentWidget.appendTo($nextWidgetElement);
                    nextWidgetElement = $nextWidgetElement[0];
                }

                // animation
                var animation = ko.utils.peekObservable(injectAnimation);
                if (typeof (animation) === "string") {
                    if ($.browser.safari === true) {
                        animation = "none";
                    }
                    var animationFunc = ko.injectAnimations[animation] || ko.injectAnimations["none"];
                    animationFunc(prevWidgetElement, nextWidgetElement);
                } else {
                    throw new Error("InjectAnimation is unknown");
                }
            }
            widgetChanged(ko.utils.unwrapObservable(widgetToInject));
            var subscription = ko.isObservable(widgetToInject) ? widgetToInject.subscribe(widgetChanged) : null;

            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                ko.utils.domNodeDisposal.removeDisposeCallback(element, arguments.callee);

                if (subscription) {
                    subscription.dispose();
                }
            });

            return { controlsDescendantBindings: true };
        }
    };

    ko.injectAnimations = {
        'none': function (prevElement, nextElement) {
            if (prevElement) {
                $(prevElement).remove();
            }
        },
        'fadeIn': function (prevElement, nextElement) {
            if (prevElement) {
                $(prevElement).remove();
            }
            if (prevElement && nextElement) {
                $(nextElement).hide().fadeIn();
            }
        },
        'fade': function (prevElement, nextElement) {
            if (prevElement && nextElement == null) {
                $(prevElement).remove();
            } else if (prevElement && nextElement) {
                var duration = 200;
                if (prevElement) {
                    var $prevElement = $(prevElement);
                    $(nextElement).css({
                        position: 'relative',
                        top: ('-' + $prevElement.height() + 'px')
                    });
                    $prevElement.fadeOut(duration).promise().done(function () {
                        $prevElement.remove();
                    });
                }
                $(nextElement).hide().fadeIn(duration).promise().done(function () {
                    if (prevElement) {
                        $(prevElement).remove();
                    }
                    $(nextElement).css({
                        position: 'static',
                        top: 'auto'
                    });
                });
            }
        }
    };

});
