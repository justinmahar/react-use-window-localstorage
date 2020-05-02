import { EventEmitter } from 'events';

/**
 * Used to keep hooks synchronized.
 *
 * Events:
 * - on `change` - `(keyName: string) => void` - The localStorage item with the provided key name has changed
 */
let emitter: EventEmitter | undefined = undefined;
export const getEmitterSingleton = (): EventEmitter => {
  if (!emitter) {
    emitter = new EventEmitter();
    emitter.setMaxListeners(100);
  }
  return emitter;
};

export const clearEvent = 'localStorage clear';
