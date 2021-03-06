declare module "redux-persist" {
  import { Store, StoreEnhancer } from "redux";

  export interface Storage {
    setItem(key: string, value: any, onComplete?: OnComplete<void>): Promise<void>;
    getItem<Result>(key: string, onComplete?: OnComplete<Result>): Promise<Result>;
    removeItem(key: string, onComplete?: OnComplete<void>): Promise<void>;
    getAllKeys<Result>(onComplete?: OnComplete<Result>): Promise<Result>;
    keys?: Noop;
    [key: string]: any; // In case Storage object has some other (private?) methods and properties.
  }

  export interface PersistorConfig {
    blacklist?: string[];
    whitelist?: string[];
    storage?: Storage;
    transforms?: Array<Transform<any, any>>;
    debounce?: number;
    serialize?: boolean;
    keyPrefix?: string;
  }

  export type TransformIn<State, Raw> = (state: State, key: string) => Raw;

  export type TransformOut<Raw, State> = (raw: Raw, key: string) => State;

  export interface Transform<State, Raw> {
    in: TransformIn<State, Raw>;
    out: TransformOut<Raw, State>;
  }

  export type OnComplete<Result> = (err?: any, result?: Result) => void;

  export interface RehydrateOptions {
    serial?: boolean;
  }

  export interface Persistor {
    purge(keys?: string[]): void;
    rehydrate<State>(incoming: State, options: RehydrateOptions): void;
    pause(): void;
    resume(): void;
  }

  export type StateReconciler<PrevState, InboundState, NextState> = (state: PrevState, inboundState: InboundState, reducedState: any, log: boolean) => NextState;

  export interface AutoRehydrateConfig {
    log?: boolean;
    stateReconciler?: StateReconciler<any, any, any>;
  }

  export function autoRehydrate<State>(autoRehydrateConfig?: AutoRehydrateConfig): StoreEnhancer<State>;

  export function createPersistor<State>(store: Store<State>, persistorConfig: PersistorConfig): Persistor;

  export interface TransformConfig {
    whitelist?: string[];
    blacklist?: string[];
  }

  export function createTransform<State, Raw>(transformIn: TransformIn<State, Raw>, transformOut: TransformOut<Raw, State>, config?: TransformConfig): Transform<State, Raw>;

  export function getStoredState(persistorConfig?: PersistorConfig, onComplete?: OnComplete<any>): void;

  export function persistStore<State>(store: Store<State>, persistorConfig?: PersistorConfig, onComplete?: OnComplete<any>): Persistor;

  export function purgeStoredState(persistorConfig?: PersistorConfig, keys?: string[]): Promise<void>;

  import * as storages from "redux-persist/storages";
  export { storages };
}

declare module "redux-persist/constants" {
  export const KEY_PREFIX: string;
  export const REHYDRATE: string;
}

declare module "redux-persist/storages" {
  export const asyncLocalStorage: Storage;
  export const asyncSessionStorage: Storage;
}
