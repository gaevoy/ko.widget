({
    baseUrl: "../src",
    mainConfigFile: "../build/config.js",
    name: "ko.widget",
    exclude: ["knockout", "jquery", "text"],
    optimize: "none",
    findNestedDependencies: true,
    preserveLicenseComments: true,
    out: "../dist/ko.widget.js"
})