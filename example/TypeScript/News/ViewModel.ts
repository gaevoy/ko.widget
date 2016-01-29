import ko = require("knockout");

export class ViewModel {
    title = ko.observable<string>();

    constructor(title: string) {
        this.title(title);
    }
}