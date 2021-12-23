import {
  extractRequestError,
  requestFailed,
  requestInactive,
  requestInProgress,
  requestSuccessful,
} from '../requestStatus';
import { Action } from 'redux-actions';

export const createAPIReducer = <
  STATE,
  SUCCESS = any,
  ERROR = any,
  RESET = any
>(
  action: string,
  statusProperty: keyof STATE,
  subReducers?: {
    onRequest?: (state: STATE) => STATE;
    onError?: (state: STATE, action: Action<ERROR>) => STATE;
    onSuccess?: (state: STATE, action: Action<SUCCESS>) => STATE;
    onReset?: (state: STATE, action: Action<RESET>) => STATE;
    onAbort?: (state: STATE, action: Action<RESET>) => STATE;
  },
) => ({
  [action]: (state: STATE): STATE => {
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
  [`${action}_SUCCESS`]: (state: STATE, action: Action<SUCCESS>): STATE => {
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
  [`${action}_ERROR`]: (state: STATE, action: Action<ERROR>): STATE => {
    const newState: STATE = {
      ...state,
      [statusProperty]: requestFailed(extractRequestError(action)),
    };
    return {
      ...(subReducers && subReducers.onError
        ? subReducers.onError(newState, action)
        : newState),
    };
  },
  [`${action}_RESET`]: (state: STATE, action: Action<RESET>): STATE => {
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
  [`${action}_ABORT`]: (state: STATE, action: Action<RESET>): STATE => {
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
