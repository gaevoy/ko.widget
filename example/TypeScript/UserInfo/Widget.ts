/// <amd-dependency path="text!./View.htm" />

import Widget = require("ko.widget");
import { ViewModel } from "./ViewModel";
var View = require("text!./View.htm");

export class UserInfoWidget extends Widget {
    viewModel: ViewModel;
    constructor() {
        super(this.viewModel = new ViewModel(), View);
    }
}