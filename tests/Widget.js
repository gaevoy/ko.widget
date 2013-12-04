define(["jquery", "knockout", "ko.widget"], function ($, ko) {

    test("Widget can be appended to any element", function () {
        // Given
        var el = createDiv();
        var widget = new TestWidget();

        // When
        widget.appendTo(el);

        // Then
        equal(el.html(), '<i data-bind="text: title">Test me</i>');
    });

    test("Widget can be appended to any element multiple times", function () {
        // Given
        var el = createDiv();
        var widget1 = new TestWidget("txt1");
        var widget2 = new TestWidget("txt2");

        // When
        widget1.appendTo(el);
        widget2.appendTo(el);

        // Then
        equal(el.html(), '<i data-bind="text: title">txt1</i><i data-bind="text: title">txt2</i>');
    });

    test("Widget field changes should be reflected into html", function () {
        // Given
        var el = createDiv();
        var widget = new TestWidget();
        widget.appendTo(el);

        // When
        widget.title("knockout");

        // Then
        equal(el.html(), '<i data-bind="text: title">knockout</i>');
    });

    test("Widget field changes should stop to be reflected after dispose", function () {
        // Given
        var el = createDiv();
        var widget = new TestWidget();
        widget.appendTo(el);

        // When
        widget.title("knockout2");
        widget.dispose();
        widget.title("knockout3");

        // Then
        equal(el.html(), '<i data-bind="text: title">knockout2</i>');
    });

    test("Widget can be attach to another element after dispose", function () {
        // Given
        var el1 = createDiv();
        var el2 = createDiv();
        var widget = new TestWidget();
        widget.appendTo(el1);
        widget.dispose();

        // When
        widget.title("knockout3");
        widget.appendTo(el2);

        // Then
        equal(el2.html(), '<i data-bind="text: title">knockout3</i>');
    });

    function TestWidget(title) {
        ko.widget.extend(this, [{ title: ko.observable(title || "Test me") }, "<i data-bind='text: title'></i>"]);
        this.exportMethods("title");
    }

    function createDiv() {
        return $("<div>").appendTo(".sandbox");
    }
});