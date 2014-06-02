// injectAnimation: 'fadeIn'
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