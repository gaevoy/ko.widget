define(["ko.widget", "./HelloCompositeViewModel", "text!./HelloCompositeView.htm"], function (Widget, ViewModel, View) {

    return function HelloCompositeWidget() {
        Widget.extend(this, [new ViewModel(), View]);
    };

});