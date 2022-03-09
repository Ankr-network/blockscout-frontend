import { RequestActionMeta, success } from '@redux-requests/core';
import { Channel, END, eventChannel, Task } from 'redux-saga';
import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  take,
  takeEvery,
  CancelledEffect,
  ForkEffect,
} from 'redux-saga/effects';
import Web3 from 'web3';

import {
  ProviderManager,
  AvailableWriteProviders,
  AccountChangedEventData,
  EventProvider,
  IAccountChangedEvent,
  IChainChangedEvent,
  IDisconnectEvent,
  IMessageEvent,
  MessageEventData,
  ProviderEvent,
  ProviderEvents,
  ProviderRpcError,
  EVENTS,
  getProvider,
  EthereumWeb3KeyProvider,
} from 'provider';

import { ProviderManagerSingleton } from 'modules/api/ProviderManagerSingleton';
import { connect, IConnect } from 'modules/auth/actions/connect';
import { disconnect } from 'modules/auth/actions/disconnect';
import { updateAccountAddress } from 'modules/auth/actions/updateAccountAddress';
import { updateConnectedNetwork } from 'modules/auth/actions/updateConnectedNetwork';

interface IListenProviderEventsArgs {
  ethWeb3KeyProvider: EthereumWeb3KeyProvider;
  providerId: AvailableWriteProviders;
}

interface IConnectSuccessAction {
  meta: RequestActionMeta<IConnect, IConnect>;
  response: {
    data: IConnect;
  };
  type: string;
}

const connectAction: string = connect.toString();

const createEventsChannel = (web3: Web3) =>
  eventChannel(emitter => {
    const eventProvider: EventProvider | null = getProvider(
      web3?.currentProvider,
    );

    if (eventProvider === null) {
      Promise.resolve().then((): void => {
        emitter({
          type: ProviderEvents.Disconnect,
          error: {
            code: 4200,
            message: 'Unsupported Method',
          },
        } as IDisconnectEvent);

        emitter(END);
      });

      return (): null => null;
    }

    EVENTS.forEach((eventName: ProviderEvents): void => {
      if (eventName === ProviderEvents.Disconnect) {
        eventProvider.on(
          ProviderEvents.Disconnect,
          (data: ProviderRpcError): void => {
            emitter({
              type: eventName,
              error: data,
            } as IDisconnectEvent);

            emitter(END);
          },
        );

        return;
      }

      eventProvider.on(
        eventName,
        (data: AccountChangedEventData | MessageEventData | string): void => {
          emitter({
            type: eventName,
            data,
          } as IAccountChangedEvent | IChainChangedEvent | IMessageEvent);
        },
      );
    });

    return (): void => {
      EVENTS.forEach((eventName: ProviderEvents): void =>
        eventProvider.removeAllListeners(eventName),
      );
    };
  });

function* listenProviderEvents({
  ethWeb3KeyProvider,
  providerId,
}: IListenProviderEventsArgs) {
  let web3: Web3 | null;

  // Note: Hypothetical "throw new Error" with unavailable "Web3"
  try {
    web3 = ethWeb3KeyProvider.getWeb3();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    yield put(disconnect(providerId));

    return;
  }

  const chan: Channel<ProviderEvent | END> = yield call(
    createEventsChannel,
    web3,
  );

  try {
    while (true) {
      const event: ProviderEvent = yield take(chan);

      switch (event.type) {
        case ProviderEvents.AccountsChanged: {
          const selectedAccount = event.data[0];
          yield put(
            updateAccountAddress({
              address: selectedAccount,
              providerId,
            }),
          );
          break;
        }

        case ProviderEvents.ChainChanged: {
          const selectedChainId = Number.parseInt(event.data, 16);

          yield put(
            updateConnectedNetwork({
              chainId: selectedChainId,
              providerId,
            }),
          );
          break;
        }

        case ProviderEvents.Disconnect:
          yield put(disconnect(providerId));
          break;

        case ProviderEvents.Message:
          break;

        default:
          break;
      }
    }
  } catch {
    yield put(disconnect(providerId));
    yield cancel();
  } finally {
    if ((yield cancelled()) as CancelledEffect) {
      chan.close();
    }
  }
}

function* connectSuccessWorker(action: IConnectSuccessAction) {
  const providerId: AvailableWriteProviders | null =
    action?.response?.data?.providerId ?? null;

  if (providerId === null) {
    return;
  }

  const providerManager: ProviderManager =
    ProviderManagerSingleton.getInstance();

  let ethWeb3KeyProvider: EthereumWeb3KeyProvider;

  // Note: Hypothetical "throw new Error" with invalid "providerId"
  try {
    ethWeb3KeyProvider = yield call(() =>
      providerManager.getProvider(providerId),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    // @TODO Please to think about "disconnectAll" hook for this
    yield put(disconnect(providerId));

    return;
  }

  const listenProviderEventsTask: Task = yield fork(listenProviderEvents, {
    ethWeb3KeyProvider,
    providerId,
  });

  yield take(connectAction);
  yield cancel(listenProviderEventsTask);
}

export function* providerEventsSaga(): Generator<ForkEffect, void> {
  yield takeEvery(success(connectAction), connectSuccessWorker);
}
