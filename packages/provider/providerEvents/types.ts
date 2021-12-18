import { IpcProvider, WebsocketProvider } from 'web3-core';
import { IWeb3KeyProvider } from '@ankr.com/stakefi-web3';
import { AnyAction } from 'redux';

export interface EventProvider
  extends Omit<IpcProvider | WebsocketProvider, 'on'> {
  on(type: string, callback: (data: any) => void): void;
}

export enum ProviderEvents {
  AccountsChanged = 'accountsChanged',
  Disconnect = 'disconnect',
  Message = 'message',
  ChainChanged = 'chainChanged',
}

export type Address = string;

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: any;
}

export type IAccountChangedEventData = {
  accounts: Address[];
};

export interface IAccountChangedEvent {
  type: ProviderEvents.AccountsChanged;
  data: IAccountChangedEventData;
}

export interface IDisconnectEvent {
  type: ProviderEvents.Disconnect;
  error: ProviderRpcError;
}

export type IMessageEventData = any;

export interface IMessageEvent {
  type: ProviderEvents.Message;
  data: IMessageEventData;
}

export interface IChainChangedEvent {
  type: ProviderEvents.ChainChanged;
  data: string;
}

export type ProviderEvent =
  | IAccountChangedEvent
  | IDisconnectEvent
  | IMessageEvent
  | IChainChangedEvent;

export interface ProviderActions {
  chainChanged?: (data: IChainChangedEvent['data']) => AnyAction;
  accountsChanged?: (data: IAccountChangedEvent['data']) => AnyAction;
  message?: (data: IMessageEventData['data']) => AnyAction;
  disconnect?: () => AnyAction;
}

export interface ProviderEventsSagaParams {
  connectAction: string;
  disconnectAction: string;
  provider: IWeb3KeyProvider;
  actions: ProviderActions;
}
