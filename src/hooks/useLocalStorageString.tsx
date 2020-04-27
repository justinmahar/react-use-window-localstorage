import { LocalStorageItem, useLocalStorageItem } from './useLocalStorageItem';

/**
 * See documentation: https://devboldly.github.io/react-use-local-storage/useLocalStorageString
 *
 * This hook gets and sets a `string` in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage).
 *
 * Features synchronization across hooks sharing the same key name.
 *
 * @param keyName - **Required.** Key name to use in localStorage.
 * @param defaultValue - Optional. Provide a default `string` value when the key's value is not found in localStorage. Will be immediately written to localStorage if not present. Use `null` for no default.
 */
export function useLocalStorageString(keyName: string, defaultValue: string | null = null): LocalStorageItem<string> {
  return useLocalStorageItem(
    keyName,
    defaultValue,
    (value: string) => value,
    itemString => itemString
  );
}
