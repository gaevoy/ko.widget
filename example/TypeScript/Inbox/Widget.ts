/// <amd-dependency path="text!./View.htm" />

import Widget = require("ko.widget");
import ViewModel = require("./ViewModel");
var View = require("text!./View.htm");

class InboxWidget {
    constructor() {
        Widget.extend(this, [ViewModel]);
    }
}

export = InboxWidget;