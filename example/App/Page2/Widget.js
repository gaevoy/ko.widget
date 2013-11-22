define(["ko.widget", "App/Page2/ViewModel", "text!App/Page2/View.htm"], function (Widget, ViewModel, View) {

    return function Page2Widget() {
        Widget.extend(this, [new ViewModel, View]);
    };

});