import { Action } from 'redux-actions';

import {
  extractRequestError,
  requestFailed,
  requestInactive,
  requestInProgress,
  requestSuccessful,
} from '../requestStatus';

export const createAPIReducer = <
  STATE,
  SUCCESS = unknown,
  ERROR = unknown,
  RESET = unknown,
>(
  key: string,
  statusProperty: keyof STATE,
  subReducers?: {
    onRequest?: (state: STATE) => STATE;
    onError?: (state: STATE, action: Action<ERROR>) => STATE;
    onSuccess?: (state: STATE, action: Action<SUCCESS>) => STATE;
    onReset?: (state: STATE, action: Action<RESET>) => STATE;
    onAbort?: (state: STATE, action: Action<RESET>) => STATE;
  },
): Record<
  string,
  <T extends SUCCESS & ERROR & RESET>(state: STATE, action: Action<T>) => STATE
> => ({
  [key]: (state: STATE): STATE => {
    const newState: STATE = {
      ...state,
      [statusProperty]: requestInProgress(),
    };
    return {
      ...(subReducers && subReducers.onRequest
        ? subReducers.onRequest(newState)
        : newState),
    };
  },
  [`${key}_SUCCESS`]: (state: STATE, action: Action<SUCCESS>): STATE => {
    const newState: STATE = {
      ...state,
      [statusProperty]: requestSuccessful(),
    };
    return {
      ...(subReducers && subReducers.onSuccess
        ? subReducers.onSuccess(newState, action)
        : newState),
    };
  },
  [`${key}_ERROR`]: (state: STATE, action: Action<ERROR>): STATE => {
    const newState: STATE = {
      ...state,
      [statusProperty]: requestFailed(extractRequestError()),
    };
    return {
      ...(subReducers && subReducers.onError
        ? subReducers.onError(newState, action)
        : newState),
    };
  },
  [`${key}_RESET`]: (state: STATE, action: Action<RESET>): STATE => {
    const newState: STATE = {
      ...state,
      [statusProperty]: requestInactive(),
    };
    return {
      ...(subReducers && subReducers.onReset
        ? subReducers.onReset(newState, action)
        : newState),
    };
  },
  [`${key}_ABORT`]: (state: STATE, action: Action<RESET>): STATE => {
    const newState: STATE = {
      ...state,
      [statusProperty]: requestInactive(),
    };
    return {
      ...(subReducers && subReducers.onAbort
        ? subReducers.onAbort(newState, action)
        : newState),
    };
  },
});
