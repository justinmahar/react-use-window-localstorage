import { renderHook } from '@testing-library/react-hooks';
import { useLocalStorageString } from '../hooks/useLocalStorageString';

describe('useLocalStorageString Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useLocalStorageString('name', 'Hohenheim'));
    expect(result.error).toBe(undefined);
  });
});
