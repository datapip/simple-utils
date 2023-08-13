"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.properCase = exports.clipboardCopy = exports.removeClass = exports.addClass = exports.removeListener = exports.addListener = exports.createElement = exports.getElement = exports.isEmpty = exports.deepCopy = exports.log = exports.debounce = exports.memoize = exports.pipe = void 0;
var pipe = function () {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return function (value) {
        return funcs.reduce(function (previous, func) {
            return func(previous);
        }, value);
    };
};
exports.pipe = pipe;
var memoize = function (func) {
    var cache = {};
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = args.toString();
        if (key in cache) {
            return cache[key];
        }
        var result = func.apply(void 0, args);
        cache[key] = result;
        return result;
    };
};
exports.memoize = memoize;
var debounce = function (func, delay) {
    var timeoutId;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function () {
            func.apply(_this, args);
        }, delay);
    };
};
exports.debounce = debounce;
var log = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    console.log.apply(console, args);
};
exports.log = log;
var deepCopy = function (obj) {
    if (typeof obj !== "object" || obj === null)
        return obj;
    var copy = Array.isArray(obj) ? [] : {};
    for (var key in obj) {
        var value = obj[key];
        copy[key] = (0, exports.deepCopy)(value);
    }
    return copy;
};
exports.deepCopy = deepCopy;
var isEmpty = function (obj) {
    if (typeof obj !== "object" || obj === null)
        return;
    if (Array.isArray(obj)) {
        return obj.length === 0;
    }
    else {
        return Object.keys(obj).length === 0;
    }
};
exports.isEmpty = isEmpty;
var getElement = function (selector) {
    return document.querySelector(selector);
};
exports.getElement = getElement;
var createElement = function (tagName, className) {
    var elem = document.createElement(tagName);
    if (className)
        elem.classList.add(className);
    return elem;
};
exports.createElement = createElement;
var addListener = function (event, func, target, capture) {
    if (capture === void 0) { capture = false; }
    (target || document).addEventListener(event, func, !!capture);
};
exports.addListener = addListener;
var removeListener = function (event, func, target, capture) {
    if (capture === void 0) { capture = false; }
    (target || document).removeEventListener(event, func, !!capture);
};
exports.removeListener = removeListener;
var addClass = function (selector, className, scope) {
    var _a;
    (_a = (scope || document).querySelector(selector)) === null || _a === void 0 ? void 0 : _a.classList.add(className);
};
exports.addClass = addClass;
var removeClass = function (selector, className, scope) {
    var _a;
    (_a = (scope || document).querySelector(selector)) === null || _a === void 0 ? void 0 : _a.classList.remove(className);
};
exports.removeClass = removeClass;
var clipboardCopy = function (text) {
    var _a;
    if ((_a = navigator === null || navigator === void 0 ? void 0 : navigator.clipboard) === null || _a === void 0 ? void 0 : _a.writeText) {
        navigator.clipboard.writeText(text);
    }
    else {
        var textArea = (0, exports.createElement)("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
    }
};
exports.clipboardCopy = clipboardCopy;
var properCase = function (text) {
    return "".concat(text[0].toUpperCase()).concat(text.slice(1).toLowerCase());
};
exports.properCase = properCase;
