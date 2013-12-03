define(["ko.widget", "App/Root/ViewModel", "text!App/Root/View.htm"], function (Widget, ViewModel, View) {

    return function RootWidget() {
        Widget.inherit(this, Widget);
        this.viewModel = new ViewModel();
        this.view = View;
    };

});