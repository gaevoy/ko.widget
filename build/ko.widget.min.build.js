({
    baseUrl: "../src",
    mainConfigFile: "../build/config.js",
    name: "ko.widget",
    exclude: ["knockout", "jquery", "text"],
    optimize: "uglify2",
    generateSourceMaps: false,
    findNestedDependencies: true,
    preserveLicenseComments: false,
    out: "../dist/ko.widget.min.js"
})