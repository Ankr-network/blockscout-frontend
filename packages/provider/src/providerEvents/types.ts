import { AnyAction } from 'redux';
import { IpcProvider, WebsocketProvider } from 'web3-core';
import { Address } from '../utils/types';
import { Web3KeyWriteProvider } from '../utils/Web3KeyWriteProvider';

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

export interface ProviderRpcError extends Error {
  message: string;
  code: number;
  data?: any;
}

export type AccountChangedEventData = Address[];

export interface IAccountChangedEvent {
  type: ProviderEvents.AccountsChanged;
  data: AccountChangedEventData;
}

export interface IDisconnectEvent {
  type: ProviderEvents.Disconnect;
  error: ProviderRpcError;
}

export type MessageEventData = any;

export interface IMessageEvent {
  type: ProviderEvents.Message;
  data: MessageEventData;
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
  message?: (data: IMessageEvent['data']) => AnyAction;
  disconnect?: () => AnyAction;
}

export interface ProviderEventsSagaParams {
  connectAction: string;
  disconnectAction: string;
  provider: Web3KeyWriteProvider;
  actions: ProviderActions;
}
