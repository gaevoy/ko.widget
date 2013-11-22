define(["Widget", "WindowHost/WindowHostViewModel", "text!WindowHost/WindowView.htm"], function (Widget, WindowHostViewModel, WindowView) {

    return function WindowHostWidget() {
        Widget.extend(this, [new WindowHostViewModel, WindowView]);

        this.exportMethods("update", "remove");
    };

});