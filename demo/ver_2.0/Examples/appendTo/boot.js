require.config({
    paths: {
        "App": "../../App",
        "ko.widget": "../../Libs/ko.widget",
        "jquery": "http://code.jquery.com/jquery-1.10.1.min",
        "knockout": "http://cdnjs.cloudflare.com/ajax/libs/knockout/2.3.0/knockout-min",
        "text": "https://raw.github.com/requirejs/text/latest/text",
        "domReady": "https://raw.github.com/requirejs/domReady/latest/domReady"
    }
});

require(["start"]);