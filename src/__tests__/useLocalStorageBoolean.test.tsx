import { renderHook } from '@testing-library/react-hooks';
import { useLocalStorageBoolean } from '../hooks/useLocalStorageBoolean';

describe('useLocalStorageBoolean Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useLocalStorageBoolean('isAwesome', true));
    expect(result.error).toBe(undefined);
  });
});
