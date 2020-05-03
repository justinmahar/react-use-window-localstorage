import React, { useEffect } from 'react';
import { clearEvent, getEmitterSingleton } from './emitter-singleton';

/**
 * See documentation: [useClearLocalStorage](https://devboldly.github.io/react-use-window-localstorage/useClearLocalStorage)
 *
 * This hook calls [localStorage.clear()](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to clear all items from `localStorage`.
 *
 * All hooks will be reset back to their default values, or to `null` if none was provided.
 */
export function useClearLocalStorage(): () => void {
  const [shouldClear, setShouldClear] = React.useState(false);
  useEffect(() => {
    if (shouldClear && typeof window !== 'undefined') {
      setShouldClear(false);
      try {
        window.localStorage.clear();
        getEmitterSingleton().emit(clearEvent);
      } catch (e) {
        console.error(e);
      }
    }
  }, [shouldClear]);

  const clearLocalStorage = React.useCallback(() => setShouldClear(true), []);
  return clearLocalStorage;
}
