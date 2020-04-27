import { renderHook } from '@testing-library/react-hooks';
import { defaultDecode, defaultEncode, useLocalStorageItem } from '../hooks/useLocalStorageItem';

// Learn how to test React hooks:
// https://react-hooks-testing-library.com/

describe('useLocalStorageItem Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() =>
      useLocalStorageItem('message', 'Son of a submariner!', defaultEncode, defaultDecode)
    );
    expect(result.error).toBe(undefined);
  });
});
