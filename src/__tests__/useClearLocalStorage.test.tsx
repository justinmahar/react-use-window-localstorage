import { renderHook } from '@testing-library/react-hooks';
import { useClearLocalStorage } from '../hooks/useClearLocalStorage';

describe('useClearLocalStorage Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useClearLocalStorage());
    expect(result.error).toBe(undefined);
  });
});
