import { t, tHTML } from 'common';
import { IRPCCallsConfig } from 'domains/requestComposer/types/avalanche';
import { avalancheJSConfig } from './avalancheJSConfig';

const root = 'chain-item.request-composer.method-description.avalanche.c-chain';

export const RPC_CALLS_CONFIG: IRPCCallsConfig = {
  'avax.getAtomicTx': {
    description: t(`${root}.getAtomicTx`),
    avalanche: avalancheJSConfig['avax.getAtomicTx'],
  },
  'avax.export': {
    disabled: true,
    description: tHTML(`${root}.export`),
    avalanche: avalancheJSConfig['avax.export'],
  },
  'avax.exportAVAX': {
    disabled: true,
    description: tHTML(`${root}.exportAVAX`),
    avalanche: avalancheJSConfig['avax.exportAVAX'],
  },
  'avax.exportKey': {
    disabled: true,
    description: tHTML(`${root}.exportKey`),
    avalanche: avalancheJSConfig['avax.exportKey'],
  },
  'avax.getUTXOs': {
    description: t(`${root}.getUTXOs`),
    avalanche: avalancheJSConfig['avax.getUTXOs'],
  },
  'avax.import': {
    disabled: true,
    description: tHTML(`${root}.import`),
    avalanche: avalancheJSConfig['avax.import'],
  },
  'avax.importAVAX': {
    disabled: true,
    description: tHTML(`${root}.importAVAX`),
    avalanche: avalancheJSConfig['avax.importAVAX'],
  },
  'avax.importKey': {
    disabled: true,
    description: tHTML(`${root}.importKey`),
    avalanche: avalancheJSConfig['avax.importKey'],
  },
  'avax.issueTx': {
    description: t(`${root}.issueTx`),
    avalanche: avalancheJSConfig['avax.issueTx'],
  },
  'avax.getAtomicTxStatus': {
    description: t(`${root}.getAtomicTxStatus`),
    avalanche: avalancheJSConfig['avax.getAtomicTxStatus'],
  },
};
