import ko = require("knockout");
import { InboxWidget } from "../Inbox/Widget";
import { NewsWidget } from "../News/Widget";
import { UserInfoWidget } from "../UserInfo/Widget";

export class ViewModel {
    inbox = ko.observable(new InboxWidget());
    userInfo = ko.observable(new UserInfoWidget());
    page = ko.observable();
    allNews = ko.observable(new NewsWidget("All"));
    userNews = ko.observable(new NewsWidget("My"));

    goto(widgetName) {
        require(["../" + widgetName + "/Widget"], PageWidget => {
            this.page(new PageWidget[widgetName + "Widget"]());
        });
    };
}