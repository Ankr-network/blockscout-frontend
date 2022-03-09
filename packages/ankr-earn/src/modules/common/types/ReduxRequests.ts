import { DispatchRequest } from '@redux-requests/core';
import { AnyAction, Store } from 'redux';

export type TStore<T> = Store<T> & {
  dispatchRequest: DispatchRequest;
};

export type TActionPromise<T> = Promise<{
  data?: T | undefined;
  error?: Error;
  isAborted?: true | undefined;
  action: AnyAction;
}>;
