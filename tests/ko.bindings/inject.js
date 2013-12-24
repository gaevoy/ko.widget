define(["jquery", "knockout", "ko.widget"], function ($, ko) {

    test("inject should invoke appendTo of widget", function () {
        // Given
        var el = createEl('<div data-bind="inject: widget"></div>');
        var viewModel = { widget: new WidgetMock() };

        // When
        ko.applyBindings(viewModel, el);

        // Then
        ok($(el).has(viewModel.element));
    });

    test("inject should invoke dispose of widget on parent ko.cleanNode", function () {
        // Given
        var el = createEl('<div data-bind="inject: widget"></div>');
        var viewModel = { widget: new WidgetMock() };
        ko.applyBindings(viewModel, el);

        // When
        ko.cleanNode(el);

        // Then
        ok(viewModel.widget.disposed);
    });

    test("inject should invoke dispose of widget on widget changed", function () {
        // Given
        var el = createEl('<div data-bind="inject: widget"></div>');
        var widget = new WidgetMock();
        var viewModel = { widget: ko.observable(widget) };
        ko.applyBindings(viewModel, el);

        // When
        viewModel.widget(new WidgetMock());

        // Then
        ok(widget.disposed);
    });

    test("inject should work inside 'if' binding", function () {
        // Given
        var el = createEl('<div data-bind="if: visible"><div data-bind="inject: widget"></div></div>');
        var viewModel = { widget: new WidgetMock(), visible: ko.observable(false) };
        ko.applyBindings(viewModel, el);

        // When
        viewModel.visible(true);
        viewModel.visible(false);
        viewModel.visible(true);

        // Then
        equal(viewModel.widget.noOfAppends, 2);
        equal(viewModel.widget.noOfDisposes, 1);
    });

    test("inject should work inside 'with' binding", function () {
        // Given
        var el = createEl('<div data-bind="with: widget"><div data-bind="inject: $data"></div></div>');
        var widget = new WidgetMock();
        var viewModel = { widget: ko.observable(null) };
        ko.applyBindings(viewModel, el);

        // When
        viewModel.widget(widget);
        viewModel.widget(null);
        viewModel.widget(widget);

        // Then
        equal(widget.noOfAppends, 2);
        equal(widget.noOfDisposes, 1);
    });

    test("inject should add debug info for container element", function () {
        // Given
        var el = createEl('<div data-bind="inject: widget"></div>');
        var viewModel = { widget: ko.observable(null) };
        ko.applyBindings(viewModel, el);

        // When
        viewModel.widget(new WidgetMock());

        // Then
        equal($(el).children(0).data("widget"), "WidgetMock");
    });

    function WidgetMock() {
        var self = this;
        this.element = null;
        this.disposed = false;
        this.noOfAppends = 0;
        this.noOfDisposes = 0;

        this.appendTo = function (el) {
            self.element = el;
            self.noOfAppends++;
        };
        this.dispose = function () {
            self.disposed = true;
            self.noOfDisposes++;
        };
    }

    function createEl(html) {
        return $(html).appendTo(".sandbox")[0];
    }
});