({
    baseUrl: "../src",
    mainConfigFile: "../build/config.js",
    name: "ko.widget",
    exclude: ["knockout", "jquery"],
    optimize: "none",
	skipModuleInsertion: true,
    findNestedDependencies: true,
    preserveLicenseComments: true,
	wrap: {
        startFile: "wrapStart.frag",
        endFile: "wrapEnd.frag"
    },
    out: "../dist/ko.widget.js"
})