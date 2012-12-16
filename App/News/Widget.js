define(["ko.widget", "App/News/ViewModel", "text!App/News/View.htm"], function (Widget, ViewModel, View) {

    return function NewsWidget(title) {
        Widget.inherit(this, Widget);
        this.viewModel = new ViewModel(title);
        this.view = View;
    };

});