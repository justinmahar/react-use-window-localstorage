export declare function useLocalStorageItem<T>(keyName: string, defaultValue: T | null | undefined, encode: (val: LocalStorageValue<T>) => string, decode: (itemString: string | null) => LocalStorageValue<T>): LocalStorageItem<T>;
export declare type LocalStorageValue<T> = T | null;
export declare type LocalStorageItem<T> = [LocalStorageValue<T>, (value: LocalStorageValue<T>) => void, () => void, () => void];
export declare function defaultEncode<T>(val: LocalStorageValue<T>): string;
export declare function defaultDecode<T>(itemString: string | null): T;
