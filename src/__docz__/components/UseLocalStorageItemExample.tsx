import * as React from 'react';
import { useLocalStorageItem } from '../../hooks/useLocalStorageItem';

export function UseLocalStorageItemExample(): JSX.Element {
  const defaultNameObject = { name: 'Zelda' };
  const [enteredFirstName, setEnteredFirstName] = React.useState('');
  const enteredNameObject = { name: enteredFirstName };
  const encode = (value) => JSON.stringify(value);
  const decode = (itemString) => JSON.parse(itemString);
  const [nameObject, setNameObject, loading, available, reset] = useLocalStorageItem(
    'nameObj',
    defaultNameObject,
    encode,
    decode,
  );
  const [nameObject2, setNameObject2, loading2] = useLocalStorageItem('nameObj', defaultNameObject, encode, decode);

  return (
    <div>
      {!loading && (
        <div>
          <div>
            Key "nameObj":{' { name: '}
            <input
              type="text"
              value={enteredFirstName}
              onChange={(e) => setEnteredFirstName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && setNameObject(enteredNameObject)}
            />
            {' } '}
            <button onClick={() => setNameObject(enteredNameObject)}>Set</button>
          </div>
          <div>
            <strong>Stored name:</strong> {JSON.stringify(nameObject)}
          </div>
        </div>
      )}
      <div>
        <button onClick={() => reset()}>Reset "nameObj" to default</button>
      </div>
      <hr />
      {!loading2 && <div>Another "nameObj" hook (different hook, will synchronize): {JSON.stringify(nameObject)}</div>}
    </div>
  );
}
