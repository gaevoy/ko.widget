require.config({
    paths: {
        "jquery": "../lib/jquery-1.8.2",
        "knockout": "../lib/knockout-2.3.0.debug"
    },
    shim: {
        "Widget": ["jquery", "knockout"],
        "widgetFor": ["knockout"],
        "ko.bindings/inject": ["jquery", "knockout", "widgetFor"],
        "WindowHost/WindowViewModel": ["knockout"],
        "WindowHost/WindowHostViewModel": ["knockout", "WindowHost/WindowViewModel"],
        "WindowHost/WindowHostWidget": ["Widget", "WindowHost/WindowHostViewModel"],
        "ko.bindings/windowInject": ["jquery", "knockout", "WindowHost/WindowHostWidget", "widgetFor"],
        "registerBinding": ["jquery", "knockout", "ko.bindings/inject", "ko.bindings/windowInject", "widgetFor"],
        "ko.bindings/injectAnimation": ["jquery", "knockout", "ko.bindings/inject"],
        "ko.widget": ["knockout", "Widget", "ko.bindings/inject", "ko.bindings/windowInject", "registerBinding", "widgetFor", "ko.bindings/injectAnimation"]
    }
});