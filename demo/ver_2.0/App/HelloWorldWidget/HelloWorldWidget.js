define(["ko.widget", "./HelloWorldViewModel", "text!./HelloWorldView.htm"], function (Widget, ViewModel, View) {

    return function HelloWorldWidget() {
        Widget.extend(this, [new ViewModel(), View]);
    };

});