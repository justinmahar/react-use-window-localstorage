"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useLocalStorageItem_1 = require("./useLocalStorageItem");
/**
 * See documentation: https://devboldly.github.io/react-use-local-storage/useLocalStorageObject
 *
 * This hook gets and sets an `Object` in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). This includes arrays.
 *
 * Uses [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)
 * and [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) for string encoding, so make sure your object is compatible with that interface. For objects that `JSON.stringify()` can't handle, provide your own encoding via [useLocalStorageItem](https://devboldly.github.io/react-use-local-storage/useLocalStorageItem).
 *
 * Features synchronization across hooks sharing the same key name.
 *
 *
 * @param keyName - **Required.** Key name to use in localStorage.
 * @param defaultValue - Optional. Provide a default `Object` value when the key's value is not found in localStorage. Will be immediately written to localStorage if not present. Use `null` for no default.
 */
function useLocalStorageObject(keyName, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return useLocalStorageItem_1.useLocalStorageItem(keyName, defaultValue, useLocalStorageItem_1.defaultEncode, useLocalStorageItem_1.defaultDecode);
}
exports.useLocalStorageObject = useLocalStorageObject;
