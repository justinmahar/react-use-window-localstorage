import * as React from 'react';
import { useClearLocalStorage } from '../../hooks/useClearLocalStorage';
import { useLocalStorageNumber } from '../../hooks/useLocalStorageNumber';

export function UseClearExample(): JSX.Element {
  const [val1, setVal1] = useLocalStorageNumber('val1', 0);
  const [val2, setVal2] = useLocalStorageNumber('val2', 0);
  const [val3, setVal3] = useLocalStorageNumber('val3', 0);
  const [val4, setVal4] = useLocalStorageNumber('val4', 0);
  const [val5, setVal5] = useLocalStorageNumber('val5');
  const clearLocalStorage = useClearLocalStorage();

  return (
    <div>
      <div>
        <div>
          <strong>Stored values:</strong>
          <ul>
            <li>val1: {val1}</li>
            <li>val2: {val2}</li>
            <li>val3: {val3}</li>
            <li>val4: {val4}</li>
            <li>val5 (no default): {val5}</li>
          </ul>
        </div>
      </div>
      <div>
        <button
          onClick={() => {
            setVal1(Math.random());
            setVal2(Math.random());
            setVal3(Math.random());
            setVal4(Math.random());
            setVal5(Math.random());
          }}
        >
          Generate Random Values
        </button>
      </div>
      <div>
        <button onClick={() => clearLocalStorage()}>Clear</button>
      </div>
    </div>
  );
}
