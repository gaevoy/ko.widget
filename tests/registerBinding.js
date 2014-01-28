define(["jquery", "knockout", "ko.widget"], function ($, ko) {

    test("Widget can be registered as binding", function () {
        // Given
        var el = createEl('<div data-bind="test: \'Binding param\'"></div>');

        // When
        ko.widget.registerBinding(TestWidget, "test");
        ko.applyBindings({}, el);

        // Then
        equal(html(el), '<i data-bind="text: title">Binding param</i>');
        delete ko.bindingHandlers["test"];
    });

    test("When widget as binding field changed, this should be promoted on init method call", function () {
        // Given
        ko.widget.registerBinding(TestWidget, "test");

        // When
        var el = createEl('<div data-bind="test: text"></div>');
        ko.applyBindings({ text: ko.observable("Field text") }, el);

        // Then
        equal(html(el), '<i data-bind="text: title">Field text</i>');
        delete ko.bindingHandlers["test"];
    });

    test("When widget as binding options changed, this should be promoted on init method call", function () {
        // Given
        ko.widget.registerBinding(TestWidget, "test");

        // When
        var el = createEl('<div data-bind="test: { text1: text, text2: text(), nested: nested}"></div>');
        ko.applyBindings({ text: ko.observable("TxT"), nested: ko.observable({ field: ko.observable(123) }) }, el);

        // Then
        var widget = ko.widgetFor(el);
        equal(JSON.stringify(widget.initArguments().length), 1);
        equal(JSON.stringify(widget.initArguments()[0]), JSON.stringify({ text1: "TxT", text2: "TxT", nested: { field: 123 } }));
        delete ko.bindingHandlers["test"];
    });

    function TestWidget() {
        ko.widget.extend(this, [new TestViewModel(), "<i data-bind='text: title'></i>"]);
        this.exportMethods("title", "initArguments");
    }

    function TestViewModel() {
        var self = this;
        this.initArguments = ko.observable(null);
        this.title = ko.observable("Test me");
        this.init = function (title) {
            self.title(title);
            self.initArguments(arguments);
        };
    }

    function createEl(html) {
        return $(html).appendTo(".sandbox")[0];
    }

    function html(el) {
        return $(el).find(".widget").html();
    }
});