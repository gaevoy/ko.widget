define(["ko.Widget", "App/UserInfo/ViewModel", "text!App/UserInfo/View.htm"], function (Widget, ViewModel, View) {

    return function UserInfoWidget() {
        Widget.inherit(this, Widget);
        this.viewModel = new ViewModel();
        this.view = View;
    };

});