import ko = require("knockout");
import $ = require("jquery");

export class ViewModel {
    name = ko.observable<string>();

    init(): JQueryPromise<any> {
        return $.Deferred().promise();
    }
}