define(["ko.widget", "App/UserInfo/ViewModel", "text!App/UserInfo/View.htm"], function (Widget, ViewModel, View) {

    return function UserInfoWidget() {
        Widget.extend(this, [new ViewModel, View]);
    };

});