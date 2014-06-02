function WindowHostWidget() {
    Widget.extend(this, [new WindowHostViewModel, '<div class="window-host" data-bind="foreach: windows"><div data-bind="inject: widget"></div></div>']);

    this.exportMethods("update", "remove");
};