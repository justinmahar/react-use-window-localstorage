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
export declare function useLocalStorageItem<T>(keyName: string, defaultValue: T | null | undefined, encode: (value: T) => string, decode: (itemString: string) => T): LocalStorageItem<T>;
export declare type LocalStorageValue<T> = T | null;
export declare type LocalStorageItem<T> = [LocalStorageValue<T>, (value: LocalStorageValue<T>) => void, boolean, () => void, () => void];
export declare function defaultEncode<T>(value: T): string;
export declare function defaultDecode<T>(itemString: string): T;
