require.config({
    paths: {
        "App": "../../App",
        "ko.widget": "../../Libs/ko.widget",
        "jquery": "../../Libs/jquery",
        "knockout": "../../Libs/knockout",
        "text": "../../Libs/text",
        "domReady": "../../Libs/domReady",
        "simrou": "../../Libs/simrou"
    },
    shim: {
        'simrou': {
            deps: ['jquery'],
            exports: 'Simrou'
        }
    }
});

require(["start"]);