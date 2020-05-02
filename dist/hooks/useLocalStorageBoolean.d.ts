import { LocalStorageItem } from './useLocalStorageItem';
/**
 * See documentation: https://devboldly.github.io/react-use-window-localstorage/useLocalStorageBoolean
 *
 * This hook gets and sets a `boolean` in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
 *
 * Features synchronization across hooks sharing the same key name.
 *
 * @param keyName - **Required.** Key name to use in localStorage.
 * @param defaultValue Optional. Provide a default `boolean` value when the key's value is not found in localStorage. Will be immediately written to localStorage if not present. Use `null` for no default.
 */
export declare function useLocalStorageBoolean(keyName: string, defaultValue?: boolean | null): LocalStorageItem<boolean>;
