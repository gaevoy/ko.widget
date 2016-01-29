import $ = require("jquery");
import ko = require("knockout");
import { RootWidget } from "./Root/Widget";

$(document).ready(() => {
    var app = new RootWidget();
    app.appendTo(document.body);
});
window["_ko"] = ko;
