import { renderHook } from '@testing-library/react-hooks';
import { useLocalStorageBoolean } from '../hooks/useLocalStorageBoolean';

// Learn how to test React hooks:
// https://react-hooks-testing-library.com/

describe('useLocalStorageBoolean Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useLocalStorageBoolean('isAwesome', true));
    expect(result.error).toBe(undefined);
  });
});
