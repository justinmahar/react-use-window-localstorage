"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = __importStar(require("react"));
var emitter_singleton_1 = require("./emitter-singleton");
/**
 * See documentation: https://devboldly.github.io/react-use-window-localstorage/useLocalStorageItem
 *
 * This hook gets and sets an item in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) using the provided encode and decode functions.
 *
 * Features synchronization across hooks sharing the same key name.
 *
 * Hooks for [boolean](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageBoolean), [number](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageNumber), and [string](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageString) primitives are available. There is also a [hook for objects](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageObject) that uses [JSON string encoding](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
 *
 * @param keyName - **Required.** Key name to use in localStorage.
 * @param defaultValueOptional - **Required.** Provide a default value when the key's value is not found in localStorage. Will be immediately written to localStorage if not present. Use `null` for no default.
 * @param encode - **Required.** Encode function for the value. Since localStorage uses strings only, all values must be encoded to a string.
 * @param decode - **Required.** Encode function for the item string in localStorage. Since localStorage uses strings only, all values must be decoded from a string.
 */
function useLocalStorageItem(keyName, defaultValue, encode, decode) {
    if (defaultValue === void 0) { defaultValue = null; }
    var _a = React.useState(true), loading = _a[0], setLoading = _a[1];
    var _b = React.useState(false), shouldPush = _b[0], setShouldPush = _b[1];
    var _c = React.useState(false), shouldPull = _c[0], setShouldPull = _c[1];
    var _d = React.useState(defaultValue), value = _d[0], setItemValue = _d[1];
    React.useEffect(function () {
        if (typeof localStorage !== 'undefined') {
            var retrievedLocalStorageState = localStorage.getItem(keyName);
            // Synchronize value with localStorage on first render
            if (loading) {
                setLoading(false);
                try {
                    // If on first render we actually find a value, pull it.
                    if (retrievedLocalStorageState !== null) {
                        setShouldPull(true);
                    }
                    // Else if we didn't find a value but a default one was provided, push it.
                    else if (defaultValue !== null) {
                        setItemValue(defaultValue);
                        setShouldPush(true);
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
    }, [keyName, loading, defaultValue]);
    React.useEffect(function () {
        if (typeof localStorage !== 'undefined') {
            var retrievedLocalStorageState = localStorage.getItem(keyName);
            // Pull value from localStorage
            if (shouldPull) {
                setShouldPull(false);
                try {
                    // Fall back to default when null
                    var newVal = retrievedLocalStorageState !== null ? decode(retrievedLocalStorageState) : defaultValue;
                    setItemValue(newVal);
                }
                catch (e) {
                    console.error(e);
                }
            }
            // Push value to localStorage
            else if (shouldPush) {
                setShouldPush(false);
                if (value !== null) {
                    try {
                        var encodedVal = encode(value);
                        localStorage.setItem(keyName, encodedVal);
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
                else {
                    localStorage.removeItem(keyName);
                }
            }
        }
    }, [keyName, shouldPull, shouldPush, decode, defaultValue, value, encode]);
    // Emitter handler (synchronizes hooks)
    React.useEffect(function () {
        var aborted = false;
        var itemChangeListener = function (value) {
            if (!aborted) {
                setItemValue(value);
            }
        };
        emitter_singleton_1.getEmitterSingleton().on(keyName, itemChangeListener);
        return function () {
            emitter_singleton_1.getEmitterSingleton().off(keyName, itemChangeListener);
            aborted = true;
        };
    });
    var setValue = React.useCallback(function (newVal) {
        if (typeof localStorage !== 'undefined') {
            var newValOrDefault = newVal !== null ? newVal : defaultValue;
            setItemValue(newValOrDefault);
            setShouldPush(true);
            emitter_singleton_1.getEmitterSingleton().emit(keyName, newVal);
        }
    }, [defaultValue, keyName, setItemValue, setShouldPush]);
    var restore = React.useCallback(function () {
        setShouldPull(true);
    }, [setShouldPull]);
    var reset = React.useCallback(function () {
        setValue(defaultValue);
    }, [defaultValue, setValue]);
    return [value, setValue, loading, reset, restore];
}
exports.useLocalStorageItem = useLocalStorageItem;
function defaultEncode(value) {
    return JSON.stringify(value);
}
exports.defaultEncode = defaultEncode;
function defaultDecode(itemString) {
    return itemString !== null ? JSON.parse(itemString) : null;
}
exports.defaultDecode = defaultDecode;
