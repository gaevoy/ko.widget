/// <amd-dependency path="text!./View.htm" />

import Widget = require("ko.widget");
import ViewModel = require("./ViewModel");
var View = require("text!./View.htm");

class InboxWidget extends Widget {
    viewModel: ViewModel;
    constructor() {
        super(this.viewModel = new ViewModel(), View);
    }

    init() {
        return this.viewModel.init();
    }
}

export = InboxWidget;