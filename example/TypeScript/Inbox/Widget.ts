/// <amd-dependency path="text!./View.htm" />

import Widget = require("ko.widget");
import { ViewModel } from "./ViewModel";
var View = require("text!./View.htm");

export class InboxWidget extends Widget {
    private viewModel: ViewModel;
    constructor() {
        super(this.viewModel = new ViewModel(), View);
    }

    init() {
        return this.viewModel.init();
    }
}