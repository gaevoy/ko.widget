ko.Widget is building block for your web application

HOW TO USE:
MyWidget.js
define(["ko.widget", "App/MyWidget/MyViewModel", "text!App/MyWidget/MyView.htm"],
    function (Widget, MyViewModel, MyView) {

    return function MyWidget(title) {
        Widget.inherit(this, Widget);
        this.viewModel = new MyViewModel(title);
        this.view = MyView;
    };

});

HOW TO ADD WIDGET TO DOM:
1. Manually
  var app = new MyWidget();
  app.appendTo($(".my-container"));
2. Using binding
  <div data-bind="inject: myWidget"></div>
