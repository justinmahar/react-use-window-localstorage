import * as React from 'react';
import { useLocalStorageNumber } from '../../hooks/useLocalStorageNumber';

export function UseLocalStorageNumberExample(): JSX.Element {
  const defaultValue = 3.14159;
  const [enteredValue, setEnteredValue] = React.useState('');
  const [value, setValue, loading, available, reset] = useLocalStorageNumber('numValue', defaultValue);
  const [value2, setValue2, loading2] = useLocalStorageNumber('numValue', defaultValue);

  return (
    <div>
      {!loading && (
        <div>
          <div>
            Key "numValue":{' '}
            <input
              type="text"
              value={enteredValue}
              onChange={(e) => setEnteredValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && setValue(parseFloat(enteredValue))}
            />
            <button onClick={() => setValue(parseFloat(enteredValue))}>Set</button>
          </div>
          <div>
            <strong>Stored value:</strong> {value}
          </div>
        </div>
      )}
      <div>
        <button onClick={() => reset()}>Reset "numValue" to default</button>
      </div>
      <hr />
      {!loading2 && <div>Another "numValue" hook (different hook, will synchronize): {value2}</div>}
    </div>
  );
}
