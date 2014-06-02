(function (factory) {
if (typeof define === 'function' && define.amd) {
    define(['knockout', 'jquery'], factory);
} else {
    factory(ko, jQuery);
}
}(function (ko, $) {



