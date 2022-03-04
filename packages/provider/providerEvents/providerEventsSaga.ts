import { success } from '@redux-requests/core';
import { END, eventChannel, Task, Channel } from 'redux-saga';
import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  take,
  takeEvery,
} from 'redux-saga/effects';
import { Web3KeyProvider } from '../providerManager';
import {
  ProviderActions,
  ProviderEvent,
  ProviderEvents,
  ProviderEventsSagaParams,
} from './types';
import { EVENTS, getProvider } from './utils';

function createEventChannel(keyProvider: Web3KeyProvider) {
  return eventChannel(emitter => {
    const web3 = keyProvider.getWeb3();
    const provider = getProvider(web3.currentProvider);

    if (!provider) return () => null;

    EVENTS.forEach(value => {
      provider.on(value, data => {
        emitter({ data, type: value });
      });
    });

    provider.on(ProviderEvents.Disconnect, () => {
      emitter(END);
    });

    return () => {
      EVENTS.forEach(value => {
        provider.removeAllListeners(value);
      });
    };
  });
}

function* listenProviderEvents(
  provider: Web3KeyProvider,
  actions: ProviderActions,
) {
  const channel: Channel<string> = yield call(createEventChannel, provider);

  const { chainChanged, accountsChanged, message, disconnect } = actions;

  try {
    while (true) {
      const event: ProviderEvent = yield take(channel);

      switch (event.type) {
        case ProviderEvents.ChainChanged:
          if (chainChanged) yield put(chainChanged(event.data));

          break;
        case ProviderEvents.AccountsChanged:
          if (accountsChanged) yield put(accountsChanged(event.data));
          break;

        case ProviderEvents.Message: {
          if (message) yield put(message(event.data));
          break;
        }

        case ProviderEvents.Disconnect: {
          if (disconnect) {
            yield put(disconnect());
          }
          break;
        }

        default:
          break;
      }
    }
  } catch (error) {
    if (disconnect) {
      yield put(disconnect());
    }
  } finally {
    const isCancelled: boolean = yield cancelled();
    if (isCancelled) {
      channel.close();
    }
  }
}

function* onConnectSuccess({
  connectAction,
  disconnectAction,
  provider,
  actions,
}: ProviderEventsSagaParams) {
  const listenProviderEventsTask: Task = yield fork(
    listenProviderEvents,
    provider,
    actions,
  );

  yield take([connectAction, disconnectAction]);
  yield cancel(listenProviderEventsTask);
}

function* onDisconnectSuccess({ provider }: ProviderEventsSagaParams) {
  yield provider.disconnect();
}

export function* providerEventsSaga(params: ProviderEventsSagaParams) {
  const { connectAction, disconnectAction } = params;

  yield takeEvery(success(connectAction), onConnectSuccess, params);
  yield takeEvery(success(disconnectAction), onDisconnectSuccess, params);
}
