import * as React from 'react';
import { getEmitterSingleton } from './emitter-singleton';

/**
 * See documentation: https://devboldly.github.io/react-use-local-storage/useLocalStorageItem
 *
 * This hook gets and sets an item in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) using the provided encode and decode functions.
 *
 * Features synchronization across hooks sharing the same key name.
 *
 * Hooks for [boolean](https://devboldly.github.io/react-use-local-storage/useLocalStorageBoolean), [number](https://devboldly.github.io/react-use-local-storage/useLocalStorageNumber), and [string](https://devboldly.github.io/react-use-local-storage/useLocalStorageString) primitives are available. There is also a [hook for objects](https://devboldly.github.io/react-use-local-storage/useLocalStorageObject) that uses [JSON string encoding](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
 *
 * @param keyName - **Required.** Key name to use in localStorage.
 * @param defaultValueOptional - **Required.** Provide a default value when the key's value is not found in localStorage. Will be immediately written to localStorage if not present. Use `null` for no default.
 * @param encode - **Required.** Encode function for the value. Since localStorage uses strings only, all values must be encoded to a string.
 * @param decode - **Required.** Encode function for the item string in localStorage. Since localStorage uses strings only, all values must be decoded from a string.
 */
export function useLocalStorageItem<T>(
  keyName: string,
  defaultValue: LocalStorageValue<T> = null,
  encode: (value: T) => string,
  decode: (itemString: string) => T
): LocalStorageItem<T> {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [shouldPush, setShouldPush] = React.useState<boolean>(false);
  const [shouldPull, setShouldPull] = React.useState<boolean>(false);
  const [value, setItemValue] = React.useState<LocalStorageValue<T>>(defaultValue);

  React.useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const retrievedLocalStorageState = localStorage.getItem(keyName);
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
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, [keyName, loading, defaultValue]);

  React.useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      const retrievedLocalStorageState = localStorage.getItem(keyName);
      // Pull value from localStorage
      if (shouldPull) {
        setShouldPull(false);
        try {
          // Fall back to default when null
          const newVal = retrievedLocalStorageState !== null ? decode(retrievedLocalStorageState) : defaultValue;
          setItemValue(newVal);
        } catch (e) {
          console.error(e);
        }
      }
      // Push value to localStorage
      else if (shouldPush) {
        setShouldPush(false);
        if (value !== null) {
          try {
            const encodedVal = encode(value);
            localStorage.setItem(keyName, encodedVal);
          } catch (e) {
            console.error(e);
          }
        } else {
          localStorage.removeItem(keyName);
        }
      }
    }
  }, [keyName, shouldPull, shouldPush, decode, defaultValue, value, encode]);

  // Emitter handler (synchronizes hooks)
  React.useEffect(() => {
    let aborted = false;
    const itemChangeListener = (value: LocalStorageValue<T>): void => {
      if (!aborted) {
        setItemValue(value);
      }
    };
    getEmitterSingleton().on(keyName, itemChangeListener);
    return () => {
      getEmitterSingleton().off(keyName, itemChangeListener);
      aborted = true;
    };
  });

  const setValue = React.useCallback(
    (newVal: LocalStorageValue<T>): void => {
      if (typeof localStorage !== 'undefined') {
        const newValOrDefault = newVal !== null ? newVal : defaultValue;
        setItemValue(newValOrDefault);
        setShouldPush(true);
        getEmitterSingleton().emit(keyName, newVal);
      }
    },
    [defaultValue, keyName, setItemValue, setShouldPush]
  );

  const restore = React.useCallback((): void => {
    setShouldPull(true);
  }, [setShouldPull]);

  const reset = React.useCallback((): void => {
    setValue(defaultValue);
  }, [defaultValue, setValue]);

  return [value, setValue, loading, reset, restore];
}
export type LocalStorageValue<T> = T | null;

export type LocalStorageItem<T> = [
  LocalStorageValue<T>,
  (value: LocalStorageValue<T>) => void,
  boolean,
  () => void,
  () => void
];

export function defaultEncode<T>(value: T): string {
  return JSON.stringify(value);
}

export function defaultDecode<T>(itemString: string): T {
  return itemString !== null ? JSON.parse(itemString) : null;
}
