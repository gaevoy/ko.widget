define(["knockout", "App/Inbox/Widget", "App/News/Widget", "App/UserInfo/Widget"], function (ko, InboxWidget, NewsWidget, UserInfoWidget) {

    return function ViewModel() {
        var self = this;

        this.inbox = ko.observable(new InboxWidget());
        this.userInfo = ko.observable(new UserInfoWidget());
        this.page = ko.observable(null);
        this.allNews = ko.observable(new NewsWidget("All"));
        this.userNews = ko.observable(new NewsWidget("My"));

        this.goto = function (widgetName) {
            require([widgetName], function (PageWidget) {
                self.page(new PageWidget());
            });
        };
    };

});
