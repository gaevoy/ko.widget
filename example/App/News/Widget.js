define(["ko.widget", "App/News/ViewModel", "text!App/News/View.htm"], function (Widget, ViewModel, View) {

    return function NewsWidget(title) {
        Widget.extend(this, [new ViewModel(title), View]);
    };

});