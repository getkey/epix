"use strict";
exports.__esModule = true;
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function startEpics(epics, action$, params) {
    var subscription = rxjs_1.merge.apply(void 0, epics.map(function (epic) { return epic(action$, params).pipe(operators_1.tap(function (action) {
        if (action.type === undefined) {
            // eslint-disable-next-line no-console
            console.error(action, 'is not an action and was returned from', epic);
            throw new TypeError('Not an action. Maybe you need to ignoreElements() in your epic.');
        }
    })); })).pipe(operators_1.tap(function (action) {
        action$.next(action);
    })).subscribe();
    return subscription;
}
exports.startEpics = startEpics;
function ofType() {
    var keys = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        keys[_i] = arguments[_i];
    }
    return function (source) { return source.pipe(operators_1.filter(function (_a) {
        var type = _a.type;
        return keys.some(function (key) { return key === type; });
    })); };
}
exports.ofType = ofType;
