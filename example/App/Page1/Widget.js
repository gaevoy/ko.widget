define(["ko.widget", "App/Page1/ViewModel", "text!App/Page1/View.htm"], function (Widget, ViewModel, View) {

    return function Page1Widget() {
        Widget.extend(this, [new ViewModel, View]);
    };

});