import { renderHook } from '@testing-library/react-hooks';
import { useLocalStorageNumber } from '../hooks/useLocalStorageNumber';

// Learn how to test React hooks:
// https://react-hooks-testing-library.com/

describe('useLocalStorageNumber Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useLocalStorageNumber('ratio', 1.618));
    expect(result.error).toBe(undefined);
  });
});
