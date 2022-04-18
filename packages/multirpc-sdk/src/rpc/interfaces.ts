import { Network } from '../common';
import { Rpc } from './Rpc';

export interface IRpcGateway {
  getInstance(network: Network): Rpc;
}