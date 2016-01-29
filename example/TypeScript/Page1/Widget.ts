/// <amd-dependency path="ko.widget" />
/// <amd-dependency path="text!./View.htm" />

import ko = require("knockout");
import { ViewModel } from "./ViewModel";
var View = require("text!./View.htm");

export class Page1Widget extends ko.Widget {
    private viewModel: ViewModel;
    constructor() {
        super(this.viewModel = new ViewModel(), View);
    }
}