import { renderHook } from '@testing-library/react-hooks';
import { useLocalStorageObject } from '../hooks/useLocalStorageObject';

describe('useLocalStorageObject Hook', () => {
  test('should run without crashing', () => {
    const { result } = renderHook(() => useLocalStorageObject('stats', { dragonballCount: 7 }));
    expect(result.error).toBe(undefined);
  });
});
