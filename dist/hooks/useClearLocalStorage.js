"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useClearLocalStorage = void 0;
var react_1 = __importStar(require("react"));
var emitter_singleton_1 = require("./emitter-singleton");
/**
 * See documentation: [useClearLocalStorage](https://justinmahar.github.io/react-use-window-localstorage/useClearLocalStorage)
 *
 * This hook calls [localStorage.clear()](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to clear all items from `localStorage`.
 *
 * All hooks will be reset back to their default values, or to `null` if none was provided.
 */
function useClearLocalStorage() {
    var _a = react_1.default.useState(false), shouldClear = _a[0], setShouldClear = _a[1];
    react_1.useEffect(function () {
        if (shouldClear && typeof window !== 'undefined') {
            setShouldClear(false);
            try {
                window.localStorage.clear();
                emitter_singleton_1.getEmitterSingleton().emit(emitter_singleton_1.clearEvent);
            }
            catch (e) {
                console.error(e);
            }
        }
    }, [shouldClear]);
    var clearLocalStorage = react_1.default.useCallback(function () { return setShouldClear(true); }, []);
    return clearLocalStorage;
}
exports.useClearLocalStorage = useClearLocalStorage;
