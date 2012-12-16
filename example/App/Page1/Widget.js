define(["ko.Widget", "App/Page1/ViewModel", "text!App/Page1/View.htm"], function (Widget, ViewModel, View) {

    return function Page1Widget() {
        Widget.inherit(this, Widget);
        this.viewModel = new ViewModel();
        this.view = View;
    };

});