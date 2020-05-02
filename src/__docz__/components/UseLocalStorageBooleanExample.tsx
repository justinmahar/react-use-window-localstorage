import * as React from 'react';
import { useLocalStorageBoolean } from '../../hooks/useLocalStorageBoolean';

export function UseLocalStorageBooleanExample(): JSX.Element {
  const defaultValue = true;
  const [value, setValue, loading, available, reset] = useLocalStorageBoolean('boolValue', defaultValue);
  const [value2, setValue2, loading2] = useLocalStorageBoolean('boolValue', defaultValue);

  return (
    <div>
      {!loading && (
        <div>
          <div>
            Key "boolValue": <button onClick={() => setValue(!value)}>Toggle</button>
          </div>
          <div>
            <strong>Stored value:</strong> {value + ''}
          </div>
        </div>
      )}
      <div>
        <button onClick={() => reset()}>Reset "boolValue" to default</button>
      </div>
      <hr />
      {!loading2 && <div>Another "boolValue" hook (different hook, will synchronize): {value2 + ''}</div>}
    </div>
  );
}
