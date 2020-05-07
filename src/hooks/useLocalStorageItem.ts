import * as React from 'react';
import { getEmitterSingleton, clearEvent } from './emitter-singleton';
import isStorageAvailable from './isStorageAvailable';

/**
 * See documentation: [useLocalStorageItem](https://devboldly.github.io/react-use-window-localstorage/useLocalStorageItem)
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
  const [available, setAvailable] = React.useState(true);

  React.useEffect(() => {
    // Synchronize value with localStorage on first render
    if (loading) {
      setLoading(false);
      // Make sure localStorage is actually available
      if (isStorageAvailable()) {
        // Get the item
        const retrievedLocalStorageState = localStorage.getItem(keyName);
        // If on first render we actually find a value, use it.
        if (retrievedLocalStorageState !== null) {
          try {
            // Set to decoded value, or fall back to default when null
            setItemValue(retrievedLocalStorageState !== null ? decode(retrievedLocalStorageState) : defaultValue);
          } catch (e) {
            console.error(e);
          }
        }
        // Else if we didn't find a value but a default one was provided, push it.
        else if (defaultValue !== null) {
          setShouldPush(true);
        }
      } else {
        setAvailable(false);
      }
    }
  }, [keyName, loading, defaultValue, decode, available]);

  React.useEffect(() => {
    if (!loading) {
      // Pull value from localStorage
      if (shouldPull) {
        try {
          const retrievedLocalStorageState = localStorage.getItem(keyName);
          setShouldPull(false);
          // Set to decoded value, or fall back to default when null
          setItemValue(retrievedLocalStorageState !== null ? decode(retrievedLocalStorageState) : defaultValue);
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
          // Remove when setting to null
          localStorage.removeItem(keyName);
        }
      }
    }
  }, [keyName, shouldPull, shouldPush, decode, defaultValue, value, encode, available, loading]);

  // Emitter handler (synchronizes hooks)
  React.useEffect(() => {
    let aborted = false;
    const itemChangeListener = (value: LocalStorageValue<T>): void => {
      if (!aborted) {
        setItemValue(value);
      }
    };
    const clearListener = (): void => {
      if (!aborted) {
        setLoading(true);
      }
    };
    getEmitterSingleton().on(keyName, itemChangeListener);
    getEmitterSingleton().on(clearEvent, clearListener);
    return () => {
      getEmitterSingleton().off(keyName, itemChangeListener);
      getEmitterSingleton().off(clearEvent, clearListener);
      aborted = true;
    };
  });

  const setValue = React.useCallback(
    (newVal: LocalStorageValue<T>): void => {
      const newValOrDefault = newVal !== null ? newVal : defaultValue;
      setItemValue(newValOrDefault);
      setShouldPush(true);
      getEmitterSingleton().emit(keyName, newVal);
    },
    [defaultValue, keyName]
  );

  const restore = React.useCallback((): void => {
    setShouldPull(true);
  }, [setShouldPull]);

  const reset = React.useCallback((): void => {
    setValue(defaultValue);
  }, [defaultValue, setValue]);

  return [value, setValue, loading, available, reset, restore];
}
export type LocalStorageValue<T> = T | null;

export type LocalStorageItem<T> = [
  LocalStorageValue<T>,
  (value: LocalStorageValue<T>) => void,
  boolean,
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
