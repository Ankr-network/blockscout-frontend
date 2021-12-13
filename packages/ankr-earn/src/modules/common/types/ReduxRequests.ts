import { DispatchRequest } from '@redux-requests/core';
import { Store } from 'redux';

export type TStore<T> = Store<T> & {
  dispatchRequest: DispatchRequest;
};
