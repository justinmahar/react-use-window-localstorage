import { LocalStorageItem } from './useLocalStorageItem';
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
export declare function useLocalStorageString(keyName: string, defaultValue?: string | null): LocalStorageItem<string>;
