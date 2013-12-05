require.config({
    paths: {
        "App": "../../App",
        "ko.widget": "../../Libs/ko.widget",
        "jquery": "http://code.jquery.com/jquery-1.10.1.min",
        "knockout": "http://cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min",
        "text": "http://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.10/text.min",
        "domReady": "http://cdnjs.cloudflare.com/ajax/libs/require-domReady/2.0.1/domReady.min"
    }
});

require(["start"]);