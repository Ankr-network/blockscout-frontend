import {
  AccountChangedEventData,
  AvailableWriteProviders,
  EthereumWeb3KeyProvider,
  EventProvider,
  EVENTS,
  getProvider,
  IAccountChangedEvent,
  IChainChangedEvent,
  IDisconnectEvent,
  IMessageEvent,
  MessageEventData,
  ProviderEvent,
  ProviderEvents,
  ProviderRpcError,
} from '@ankr.com/provider';
import { RequestActionMeta, success } from '@redux-requests/core';
import { SelectEffect, TakeEffect } from '@redux-saga/core/effects';
import { Channel, END, eventChannel, Task } from 'redux-saga';
import {
  call,
  cancel,
  cancelled,
  CancelledEffect,
  fork,
  ForkEffect,
  put,
  select,
  take,
} from 'redux-saga/effects';
import Web3 from 'web3';

import { ProviderManagerSingleton } from '@ankr.com/staking-sdk';

import { connect, IConnect } from 'modules/auth/common/actions/connect';
import { disconnect } from 'modules/auth/common/actions/disconnect';
import { updateAccountAddress } from 'modules/auth/common/actions/updateAccountAddress';
import {
  IProviderStatus,
  selectEthProviderData,
} from 'modules/auth/common/store/authSlice';
import { updateConnectedNetwork } from 'modules/auth/eth/actions/updateConnectedNetwork';

interface IListenProviderWeb3EventsArgs {
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

const createWeb3EventsChannel = (web3: Web3) =>
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

function* listenProviderWeb3Events({
  ethWeb3KeyProvider,
  providerId,
}: IListenProviderWeb3EventsArgs) {
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
    createWeb3EventsChannel,
    web3,
  );

  try {
    while (true) {
      const event: ProviderEvent = yield take(chan);
      const ethAuthState: IProviderStatus | undefined = yield select(
        selectEthProviderData,
      );

      if (!ethAuthState?.isActive) {
        yield cancel();
      }

      switch (event.type) {
        case ProviderEvents.AccountsChanged: {
          const selectedAccount = event.data[0] as string | undefined;

          // when a user locks a wallet in the metamask interface,
          // an account change event with empty data is triggered instead of disconnecting
          if (!selectedAccount) {
            yield put(disconnect(providerId));
          } else {
            yield put(
              updateAccountAddress({
                address: selectedAccount,
                providerId,
              }),
            );
          }

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

        case ProviderEvents.Disconnect: {
          if (disconnect) {
            yield put(disconnect(providerId));
          }
          break;
        }

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

function* connectSuccessWeb3Worker(providerId: AvailableWriteProviders) {
  const providerManager = ProviderManagerSingleton.getInstance();

  let ethWeb3KeyProvider: EthereumWeb3KeyProvider;

  // Note: Hypothetical "throw new Error" with invalid "providerId"
  try {
    ethWeb3KeyProvider = yield call(() =>
      providerManager.getETHWriteProvider(),
    );
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    yield put(disconnect(providerId));

    return;
  }

  const task: Task = yield fork(listenProviderWeb3Events, {
    ethWeb3KeyProvider,
    providerId,
  });

  yield take(connectAction);
  yield cancel(task);
}

export function* providerEventsSaga(): Generator<
  TakeEffect | SelectEffect | ForkEffect<void>,
  void,
  IConnectSuccessAction & IProviderStatus & Task
> {
  let ethProviderId: AvailableWriteProviders | undefined;
  let ethTask: Task | undefined;

  try {
    while (true) {
      const actionData: IConnectSuccessAction = yield take(
        success(connectAction),
      );
      const ethAuthState: IProviderStatus | undefined = yield select(
        selectEthProviderData,
      );
      const providerId: AvailableWriteProviders | null =
        actionData?.response?.data?.providerId ?? null;

      if (!ethAuthState?.isActive) {
        ethProviderId = undefined;

        ethTask?.cancel();
      }

      if (providerId === null) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (providerId === AvailableWriteProviders.ethCompatible) {
        ethProviderId = providerId;
      }

      if (typeof ethProviderId !== 'undefined') {
        ethTask?.cancel();

        ethTask = yield fork(connectSuccessWeb3Worker, ethProviderId);
      }
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  } finally {
    ethTask?.cancel();
  }
}
