define(["ko.widget", "App/Root/ViewModel", "text!App/Root/View.htm"], function (Widget, ViewModel, View) {

    return function RootWidget() {
        Widget.extend(this, [new ViewModel, View]);
    };

});