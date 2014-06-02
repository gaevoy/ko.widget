define(["jquery", "knockout", "ko.widget"], function ($, ko) {

    test("windowInject should invoke appendTo of widget", function () {
        // Given
        var el = createEl('<div data-bind="windowInject: widget"></div>');
        var viewModel = { widget: new WidgetMock() };

        // When
        ko.applyBindings(viewModel, el);

        // Then
        ok($(".window-host").has(viewModel.element));
    });

    test("windowInject should invoke dispose of widget on parent ko.cleanNode", function () {
        // Given
        var el = createEl('<div data-bind="windowInject: widget"></div>');
        var viewModel = { widget: new WidgetMock() };
        ko.applyBindings(viewModel, el);

        // When
        ko.cleanNode(el);

        // Then
        ok(viewModel.widget.disposed);
    });

    test("windowInject should invoke dispose of widget on widget changed", function () {
        // Given
        var el = createEl('<div data-bind="windowInject: widget"></div>');
        var widget = new WidgetMock();
        var viewModel = { widget: ko.observable(widget) };
        ko.applyBindings(viewModel, el);

        // When
        viewModel.widget(new WidgetMock());

        // Then
        ok(widget.disposed);
    });

    test("windowInject should work inside 'if' binding", function () {
        // Given
        var el = createEl('<div data-bind="if: visible"><div data-bind="windowInject: widget"></div></div>');
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

    test("windowInject should work inside 'with' binding", function () {
        // Given
        var el = createEl('<div data-bind="with: widget"><div data-bind="windowInject: $data"></div></div>');
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

    test("windowInject should clear html when it becomes null", function () {
        // Given
        var el = createEl('<div data-bind="windowInject: widget"></div>');
        function TextWidget() {
            this.appendTo = function (el) {
                el.text("Text 123");
            };
            this.dispose = function () { };
        }
        var viewModel = { widget: ko.observable(new TextWidget()) };
        ko.applyBindings(viewModel, el);
        var widgetEl = $(".window-host > div:last-child");

        // When
        viewModel.widget(null);

        // Then
        ok(widgetEl.is(":empty"));
    });

    if (!$.browser.msie)
        test("windowInject should add debug info for container element", function () {
            // Given
            var el = createEl('<div data-bind="windowInject: widget"></div>');
            var viewModel = { widget: ko.observable(null) };
            ko.applyBindings(viewModel, el);

            // When
            function NamedWidget123() {
                this.appendTo = function () {
                };
            }
            viewModel.widget(new NamedWidget123());

            // Then
            var el = $(".window-host > div:last-child");
            equal($.trim($(el).children(0).data("widget")), "NamedWidget123");
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