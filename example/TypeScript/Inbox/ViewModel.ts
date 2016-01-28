import ko = require("knockout");
import $ = require("jquery");

class ViewModel {
    name = ko.observable<string>();

    init(): JQueryPromise<any> {
        return $.Deferred().promise();
    }
}

export = ViewModel;