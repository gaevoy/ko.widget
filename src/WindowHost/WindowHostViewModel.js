define(["knockout", "./WindowViewModel"], function (ko, WindowViewModel) {

    return function WindowHostViewModel() {
        var self = this;
        var KEY_PREFIX = "wnd";
        var windowById = {};

        this.windows = ko.observableArray([]);

        this.update = function (id, widget) {
            var wnd = windowById[KEY_PREFIX + id];
            if (!wnd) {
                wnd = new WindowViewModel(id);
                windowById[KEY_PREFIX + id] = wnd;
                self.windows.push(wnd);
            }
            wnd.widget(widget);
        };
        this.remove = function (id) {
            var wnd = windowById[KEY_PREFIX + id];
            if (wnd) {
                wnd.dispose();
                self.windows.remove(wnd);
            }
        };
    };
});
