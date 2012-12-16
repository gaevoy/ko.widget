define(["ko.Widget", "App/Page2/ViewModel", "text!App/Page2/View.htm"], function (Widget, ViewModel, View) {

    return function Page2Widget() {
        Widget.inherit(this, Widget);
        this.viewModel = new ViewModel();
        this.view = View;
    };

});