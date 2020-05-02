/**
 * See documentation: https://devboldly.github.io/react-use-window-localstorage/useClearLocalStorage
 *
 * This hook calls [localStorage.clear()](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to clear all items from `localStorage`.
 *
 * All hooks will be reset back to their default values, or to `null` if none was provided.
 */
export declare function useClearLocalStorage(): () => void;
