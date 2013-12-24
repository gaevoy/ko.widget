({
    baseUrl: "../src",
    mainConfigFile: "../build/config.js",
    name: "ko.widget",
    exclude: ["knockout", "jquery"],
    optimize: "none",
    findNestedDependencies: true,
    preserveLicenseComments: true,
    out: "../dist/ko.widget.js"
})