import { DispatchRequest } from '@redux-requests/core';
import { Store } from 'redux';

export type TStore<T> = Store<T> & {
  dispatchRequest: DispatchRequest;
};

export type TActionPromise<T> = Promise<{
  data?: T | undefined;
  error?: any;
  isAborted?: true | undefined;
  action: any;
}>;
