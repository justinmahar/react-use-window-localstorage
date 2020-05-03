import { LocalStorageItem, useLocalStorageItem, defaultEncode, defaultDecode } from './useLocalStorageItem';

/**
 * See documentation: [useLocalStorageNumber](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageNumber)
 *
 * This hook gets and sets a `number` in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
 *
 * Features synchronization across hooks sharing the same key name.
 *
 * @param keyName - **Required.** Key name to use in localStorage.
 * @param defaultValue - Optional. Provide a default `number` value when the key's value is not found in localStorage. Will be immediately written to localStorage if not present. Use `null` for no default.
 */
export function useLocalStorageNumber(keyName: string, defaultValue: number | null = null): LocalStorageItem<number> {
  return useLocalStorageItem(keyName, defaultValue, defaultEncode, defaultDecode);
}
