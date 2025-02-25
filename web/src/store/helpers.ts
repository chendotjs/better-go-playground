import { Action, ActionType } from './actions';
import {State} from "./state";

export type Reducer<S, T> = (s: S, a: Action<T>) => S;
export type ActionReducers<T> = { [k in keyof typeof ActionType | string]: Reducer<T, any> };

export type DispatchFn = (a: Action | any) => any;
export type StateProvider = () => State

/**
 * Maps reducers by action type
 * @param reducers Key-value pair of action type and reducer
 * @param initialState Initial state
 */
export function mapByAction<T>(reducers: ActionReducers<T>, initialState: T): Reducer<T, any> {
  return (state: T = initialState, action: Action) => {
    if (reducers[action.type]) {
      const newState = { ...state };
      return reducers[action.type](newState, action);
    }

    return state;
  };
}
