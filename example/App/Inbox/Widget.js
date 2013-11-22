define(["ko.widget", "App/Inbox/ViewModel", "text!App/Inbox/View.htm"], function (Widget, ViewModel, View) {

    return function InboxWidget() {
        Widget.extend(this, [new ViewModel, View]);
    };

});