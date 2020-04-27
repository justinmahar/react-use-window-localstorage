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
function useLocalStorageItem(keyName, defaultValue, encode, decode) {
    if (defaultValue === void 0) { defaultValue = null; }
    var _a = React.useState(true), firstRender = _a[0], setFirstRender = _a[1];
    var _b = React.useState(false), shouldPush = _b[0], setShouldPush = _b[1];
    var _c = React.useState(false), shouldPull = _c[0], setShouldPull = _c[1];
    var _d = React.useState(defaultValue), itemValue = _d[0], setValue = _d[1];
    React.useEffect(function () {
        if (localStorage) {
            var retrievedLocalStorageState = localStorage.getItem(keyName);
            // Synchronize value with localStorage on first render
            if (firstRender) {
                setFirstRender(false);
                try {
                    // If on first render we actually find a value, pull it.
                    if (retrievedLocalStorageState !== null) {
                        setShouldPull(true);
                    }
                    // Else if we didn't find a value but a default one was provided, push it.
                    else if (defaultValue !== null) {
                        setValue(defaultValue);
                        setShouldPush(true);
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
        }
    }, [keyName, firstRender, defaultValue]);
    React.useEffect(function () {
        if (localStorage) {
            var retrievedLocalStorageState = localStorage.getItem(keyName);
            // Pull value from localStorage
            if (shouldPull) {
                setShouldPull(false);
                try {
                    // Fall back to default when null
                    var newVal = retrievedLocalStorageState !== null ? decode(retrievedLocalStorageState) : defaultValue;
                    setValue(newVal);
                }
                catch (e) {
                    console.error(e);
                }
            }
            // Push value to localStorage
            else if (shouldPush) {
                setShouldPush(false);
                if (itemValue !== null) {
                    try {
                        var encodedVal = encode(itemValue);
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
    }, [keyName, shouldPull, shouldPush, decode, defaultValue, itemValue, encode]);
    var setItemValue = function (newVal) {
        if (localStorage) {
            var newValOrDefault = newVal !== null ? newVal : defaultValue;
            setValue(newValOrDefault);
            setShouldPush(true);
        }
    };
    var restore = function () {
        setShouldPull(true);
    };
    var reset = function () {
        setItemValue(defaultValue);
    };
    return [itemValue, setItemValue, reset, restore];
}
exports.useLocalStorageItem = useLocalStorageItem;
function defaultEncode(val) {
    return JSON.stringify(val);
}
exports.defaultEncode = defaultEncode;
function defaultDecode(itemString) {
    return itemString !== null ? JSON.parse(itemString) : null;
}
exports.defaultDecode = defaultDecode;
