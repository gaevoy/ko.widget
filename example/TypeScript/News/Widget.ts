/// <amd-dependency path="text!./View.htm" />

import Widget = require("ko.widget");
import { ViewModel } from "./ViewModel";
var View = require("text!./View.htm");

export class NewsWidget extends Widget {
    private viewModel: ViewModel;
    constructor(title: string) {
        super(this.viewModel = new ViewModel(title), View);
    }
}