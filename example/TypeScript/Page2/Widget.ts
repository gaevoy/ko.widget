/// <amd-dependency path="text!./View.htm" />

import Widget = require("ko.widget");
import { ViewModel } from "./ViewModel";
var View = require("text!./View.htm");

export class Page2Widget extends Widget {
    private viewModel: ViewModel;
    constructor() {
        super(this.viewModel = new ViewModel(), View);
    }
}