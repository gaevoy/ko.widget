define(["ko.Widget", "App/Inbox/ViewModel", "text!App/Inbox/View.htm"], function (Widget, ViewModel, View) {

    return function InboxWidget() {
        Widget.inherit(this, Widget);
        this.viewModel = new ViewModel();
        this.view = View;
    };

});