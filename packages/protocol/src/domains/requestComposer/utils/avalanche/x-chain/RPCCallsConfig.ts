import { tHTML } from '@ankr.com/common';
import { XChainMethod } from 'domains/requestComposer/constants/avalanche';
import { IRPCCallsConfig } from 'domains/requestComposer/types/avalanche';
import { avalancheJSConfig } from './avalancheJSConfig';

const root = 'chain-item.request-composer.method-description.avalanche.x-chain';

export const RPC_CALLS_CONFIG: IRPCCallsConfig<XChainMethod> = {
  'avm.buildGenesis': {
    disabled: true,
    description: tHTML(`${root}.buildGenesis`),
    avalanche: avalancheJSConfig['avm.buildGenesis'],
  },
  'avm.createAddress': {
    disabled: true,
    description: tHTML(`${root}.createAddress`),
    avalanche: avalancheJSConfig['avm.createAddress'],
  },
  'avm.createFixedCapAsset': {
    disabled: true,
    description: tHTML(`${root}.createFixedCapAsset`),
    avalanche: avalancheJSConfig['avm.createFixedCapAsset'],
  },
  'avm.mint': {
    disabled: true,
    description: tHTML(`${root}.mint`),
    avalanche: avalancheJSConfig['avm.mint'],
  },
  'avm.createVariableCapAsset': {
    disabled: true,
    description: tHTML(`${root}.createVariableCapAsset`),
    avalanche: avalancheJSConfig['avm.createVariableCapAsset'],
  },
  'avm.createNFTAsset': {
    disabled: true,
    description: tHTML(`${root}.createNFTAsset`),
    avalanche: avalancheJSConfig['avm.createNFTAsset'],
  },
  'avm.mintNFT': {
    disabled: true,
    description: tHTML(`${root}.mintNFT`),
    avalanche: avalancheJSConfig['avm.mintNFT'],
  },
  'avm.export': {
    disabled: true,
    description: tHTML(`${root}.export`),
    avalanche: avalancheJSConfig['avm.export'],
  },
  'avm.exportKey': {
    disabled: true,
    description: tHTML(`${root}.exportKey`),
    avalanche: avalancheJSConfig['avm.exportKey'],
  },
  'avm.getAllBalances': {
    description: tHTML(`${root}.getAllBalances`),
    avalanche: avalancheJSConfig['avm.getAllBalances'],
  },
  'avm.getAssetDescription': {
    description: tHTML(`${root}.getAssetDescription`),
    avalanche: avalancheJSConfig['avm.getAssetDescription'],
  },
  'avm.getBalance': {
    description: tHTML(`${root}.getBalance`),
    avalanche: avalancheJSConfig['avm.getBalance'],
  },
  'avm.getAddressTxs': {
    description: tHTML(`${root}.getAddressTxs`),
    avalanche: avalancheJSConfig['avm.getAddressTxs'],
  },
  'avm.getTx': {
    description: tHTML(`${root}.getTx`),
    avalanche: avalancheJSConfig['avm.getTx'],
  },
  'avm.getTxStatus': {
    description: tHTML(`${root}.getTxStatus`),
    avalanche: avalancheJSConfig['avm.getTxStatus'],
  },
  'avm.getUTXOs': {
    description: tHTML(`${root}.getUTXOs`),
    avalanche: avalancheJSConfig['avm.getUTXOs'],
  },
  'avm.import': {
    disabled: true,
    description: tHTML(`${root}.import`),
    avalanche: avalancheJSConfig['avm.import'],
  },
  'avm.importKey': {
    disabled: true,
    description: tHTML(`${root}.importKey`),
    avalanche: avalancheJSConfig['avm.importKey'],
  },
  'avm.issueTx': {
    description: tHTML(`${root}.issueTx`),
    avalanche: avalancheJSConfig['avm.issueTx'],
  },
  'avm.listAddresses': {
    disabled: true,
    description: tHTML(`${root}.listAddresses`),
    avalanche: avalancheJSConfig['avm.listAddresses'],
  },
  'avm.send': {
    disabled: true,
    description: tHTML(`${root}.send`),
    avalanche: avalancheJSConfig['avm.send'],
  },
  'avm.sendMultiple': {
    disabled: true,
    description: tHTML(`${root}.sendMultiple`),
    avalanche: avalancheJSConfig['avm.sendMultiple'],
  },
  'avm.sendNFT': {
    disabled: true,
    description: tHTML(`${root}.sendNFT`),
    avalanche: avalancheJSConfig['avm.sendNFT'],
  },
};
