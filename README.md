**ko.widget** is building block for your web application

##How to use:
MyWidget.js
```
define(["ko.widget", "App/MyWidget/MyViewModel", "text!App/MyWidget/MyView.htm"],
    function (Widget, MyViewModel, MyView) {

    return function MyWidget() {
        Widget.inherit(this, Widget);
        this.viewModel = new MyViewModel();
        this.view = MyView;
    };

});
```
##How to add widget to dom:
###1. Manually
```
var myWidget = new MyWidget();
myWidget.appendTo($(".my-container"));
```
###2. Using binding
```
<div data-bind="inject: myWidget"></div>
```
