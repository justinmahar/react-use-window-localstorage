"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useLocalStorageItem_1 = require("./useLocalStorageItem");
function useLocalStorageObject(keyName, defaultValue) {
    if (defaultValue === void 0) { defaultValue = null; }
    return useLocalStorageItem_1.useLocalStorageItem(keyName, defaultValue, useLocalStorageItem_1.defaultEncode, useLocalStorageItem_1.defaultDecode);
}
exports.useLocalStorageObject = useLocalStorageObject;
