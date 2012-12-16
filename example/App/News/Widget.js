define(["ko.Widget", "App/News/ViewModel", "text!App/News/View.htm"], function (Widget, ViewModel, View) {

    return function NewsWidget() {
        Widget.inherit(this, Widget);
        this.viewModel = new ViewModel();
        this.view = View;
    };

});