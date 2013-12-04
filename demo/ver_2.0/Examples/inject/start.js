require(["knockout", "AppViewModel", "domReady!"], function (ko, AppViewModel) {

    ko.applyBindings(new AppViewModel());

});