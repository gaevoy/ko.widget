require(["knockout", "AppViewModel", "domReady!"], function (ko, AppViewModel) {

    var app = new AppViewModel();
    app.init();
    ko.applyBindings(app);

});