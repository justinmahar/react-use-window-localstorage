"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLocalStorageString = void 0;
var useLocalStorageItem_1 = require("./useLocalStorageItem");
/**
 * See documentation: [useLocalStorageString](https://justinmahar.github.io/react-use-window-localstorage/useLocalStorageString)
 *
 * This hook gets and sets a `string` in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
 *
 * Features synchronization across hooks sharing the same key name.
 *
 * @param keyName - **Required.** Key name to use in localStorage.
 * @param defaultValue - Optional. Provide a default `string` value when the key's value is not found in localStorage. Will be immediately written to localStorage if not present. Use `null` for no default.
 */
function useLocalStorageString(keyName, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return useLocalStorageItem_1.useLocalStorageItem(keyName, defaultValue, function (value) { return value; }, function (itemString) { return itemString; });
}
exports.useLocalStorageString = useLocalStorageString;
