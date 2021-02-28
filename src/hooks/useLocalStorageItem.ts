import * as React from 'react';
import { getEmitterSingleton, clearEvent } from './emitter-singleton';
import isStorageAvailable from './isStorageAvailable';

/**
 * See documentation: [useLocalStorageItem](https://justinmahar.github.io/react-use-window-localstorage/useLocalStorageItem)
 *
 * This hook gets and sets an item in [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) using the provided encode and decode functions.
 *
 * Features synchronization across hooks sharing the same key name.
 *
 * Hooks for [boolean](https://justinmahar.github.io/react-use-window-localstorage/useLocalStorageBoolean), [number](https://justinmahar.github.io/react-use-window-localstorage/useLocalStorageNumber), and [string](https://justinmahar.github.io/react-use-window-localstorage/useLocalStorageString) primitives are available. There is also a [hook for objects](https://justinmahar.github.io/react-use-window-localstorage/useLocalStorageObject) that uses [JSON string encoding](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
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
  decode: (itemString: string) => T,
): LocalStorageItem<T> {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [shouldPush, setShouldPush] = React.useState<boolean>(false);
  const [itemString, setItemString] = React.useState<string | null>(null);
  const [available, setAvailable] = React.useState(true);
  const [renderTime, setRenderTime] = React.useState(new Date().getTime());

  React.useEffect(() => {
    // Synchronize value with localStorage on first render
    if (loading) {
      setLoading(false);
      // Make sure localStorage is actually available
      if (isStorageAvailable()) {
        const currentItemString = localStorage.getItem(keyName);
        // If on first render we actually find a value, use it.
        if (currentItemString !== null) {
          setItemString(localStorage.getItem(keyName));
        }
        // Else if we didn't find a value but a default one was provided, set it.
        else if (defaultValue !== null) {
          try {
            setItemString(encode(defaultValue));
            setShouldPush(true);
          } catch (e) {
            console.error(e);
          }
        }
      } else {
        setAvailable(false);
      }
    }
  }, [keyName, loading, defaultValue, decode, available, encode]);

  React.useEffect(() => {
    if (!loading && available) {
      // Push value to localStorage
      if (shouldPush) {
        setShouldPush(false);
        if (itemString !== null) {
          localStorage.setItem(keyName, itemString);
        } else {
          // Remove when setting to null
          localStorage.removeItem(keyName);
        }
        // Notify all hooks that have already been rendered.
        getEmitterSingleton().emit(keyName, itemString);
      }
    }
  }, [itemString, keyName, loading, shouldPush, available]);

  React.useEffect(() => {
    if (!loading && available && !shouldPush) {
      // Check if the latest value from localStorage is different from current value
      const trueValue = localStorage.getItem(keyName);
      if (itemString !== trueValue) {
        setItemString(trueValue);
      }
    }
  });

  // Emitter handler (synchronizes hooks)
  React.useEffect(() => {
    let aborted = false;
    const itemChangeListener = (itemString: string | null): void => {
      if (!aborted) {
        setRenderTime(new Date().getTime());
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
      try {
        if (newVal === null) {
          setItemString(null);
        } else {
          setItemString(encode(newVal));
        }
        setShouldPush(true);
      } catch (e) {
        console.error(e);
      }
    },
    [encode],
  );

  const reset = React.useCallback((): void => {
    setValue(defaultValue);
  }, [defaultValue, setValue]);

  const value = itemString !== null ? decode(itemString) : defaultValue;

  return [value, setValue, loading, available, reset];
}
export type LocalStorageValue<T> = T | null;

export type LocalStorageItem<T> = [
  LocalStorageValue<T>,
  (value: LocalStorageValue<T>) => void,
  boolean,
  boolean,
  () => void,
];

export function defaultEncode<T>(value: T): string {
  return JSON.stringify(value);
}

export function defaultDecode<T>(itemString: string): T {
  return itemString !== null ? JSON.parse(itemString) : null;
}
