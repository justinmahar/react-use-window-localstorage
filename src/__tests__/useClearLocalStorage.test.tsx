import { renderHook } from '@testing-library/react-hooks';
import { useClearLocalStorage } from '../hooks/useClearLocalStorage';

// Learn how to test React hooks:
// https://react-hooks-testing-library.com/

describe('useClearLocalStorage Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useClearLocalStorage());
    expect(result.error).toBe(undefined);
  });
});
