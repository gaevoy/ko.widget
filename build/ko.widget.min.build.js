({
    baseUrl: "../src",
    mainConfigFile: "../build/config.js",
    name: "ko.widget",
    exclude: ["knockout", "jquery"],
    optimize: "uglify2",
	skipModuleInsertion: true,
    generateSourceMaps: false,
    findNestedDependencies: true,
    preserveLicenseComments: false,
	wrap: {
        startFile: "wrapStart.frag",
        endFile: "wrapEnd.frag"
    },
    out: "../dist/ko.widget.min.js"
})