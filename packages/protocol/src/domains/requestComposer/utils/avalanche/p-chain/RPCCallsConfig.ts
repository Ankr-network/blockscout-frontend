import { tHTML } from 'common';
import { PChainMethod } from 'domains/requestComposer/constants/avalanche';
import { IRPCCallsConfig } from 'domains/requestComposer/types/avalanche';
import { avalancheJSConfig } from './avalancheJSConfig';

const root = 'chain-item.request-composer.method-description.avalanche.p-chain';

export const RPC_CALLS_CONFIG: IRPCCallsConfig<PChainMethod> = {
  'platform.addDelegator': {
    disabled: true,
    description: tHTML(`${root}.addDelegator`),
    avalanche: avalancheJSConfig['platform.addDelegator'],
  },
  'platform.addValidator': {
    disabled: true,
    description: tHTML(`${root}.addValidator`),
    avalanche: avalancheJSConfig['platform.addValidator'],
  },
  'platform.addSubnetValidator': {
    disabled: true,
    description: tHTML(`${root}.addSubnetValidator`),
    avalanche: avalancheJSConfig['platform.addSubnetValidator'],
  },
  'platform.createAddress': {
    disabled: true,
    description: tHTML(`${root}.createAddress`),
    avalanche: avalancheJSConfig['platform.createAddress'],
  },
  'platform.createBlockchain': {
    disabled: true,
    description: tHTML(`${root}.createBlockchain`),
    avalanche: avalancheJSConfig['platform.createBlockchain'],
  },
  'platform.createSubnet': {
    disabled: true,
    description: tHTML(`${root}.createSubnet`),
    avalanche: avalancheJSConfig['platform.createSubnet'],
  },
  'platform.exportAVAX': {
    disabled: true,
    description: tHTML(`${root}.exportAVAX`),
    avalanche: avalancheJSConfig['platform.exportAVAX'],
  },
  'platform.exportKey': {
    disabled: true,
    description: tHTML(`${root}.exportKey`),
    avalanche: avalancheJSConfig['platform.exportKey'],
  },
  'platform.getBalance': {
    description: tHTML(`${root}.getBalance`),
    avalanche: avalancheJSConfig['platform.getBalance'],
  },
  'platform.getBlockchains': {
    description: tHTML(`${root}.getBlockchains`),
    avalanche: avalancheJSConfig['platform.getBlockchains'],
  },
  'platform.getBlockchainStatus': {
    description: tHTML(`${root}.getBlockchainStatus`),
    avalanche: avalancheJSConfig['platform.getBlockchainStatus'],
  },
  'platform.getCurrentSupply': {
    description: tHTML(`${root}.getCurrentSupply`),
    avalanche: avalancheJSConfig['platform.getCurrentSupply'],
  },
  'platform.getCurrentValidators': {
    description: tHTML(`${root}.getCurrentValidators`),
    avalanche: avalancheJSConfig['platform.getCurrentValidators'],
  },
  'platform.getHeight': {
    description: tHTML(`${root}.getHeight`),
    avalanche: avalancheJSConfig['platform.getHeight'],
  },
  'platform.getMaxStakeAmount': {
    description: tHTML(`${root}.getMaxStakeAmount`),
    avalanche: avalancheJSConfig['platform.getMaxStakeAmount'],
  },
  'platform.getMinStake': {
    description: tHTML(`${root}.getMinStake`),
    avalanche: avalancheJSConfig['platform.getMinStake'],
  },
  'platform.getPendingValidators': {
    description: tHTML(`${root}.getPendingValidators`),
    avalanche: avalancheJSConfig['platform.getPendingValidators'],
  },
  'platform.getRewardUTXOs': {
    description: tHTML(`${root}.getRewardUTXOs`),
    avalanche: avalancheJSConfig['platform.getRewardUTXOs'],
  },
  'platform.getStakingAssetID': {
    description: tHTML(`${root}.getStakingAssetID`),
    avalanche: avalancheJSConfig['platform.getStakingAssetID'],
  },
  'platform.getSubnets': {
    description: tHTML(`${root}.getSubnets`),
    avalanche: avalancheJSConfig['platform.getSubnets'],
  },
  'platform.getStake': {
    description: tHTML(`${root}.getStake`),
    avalanche: avalancheJSConfig['platform.getStake'],
  },
  'platform.getTimestamp': {
    description: tHTML(`${root}.getTimestamp`),
    avalanche: avalancheJSConfig['platform.getTimestamp'],
  },
  'platform.getTotalStake': {
    description: tHTML(`${root}.getTotalStake`),
    avalanche: avalancheJSConfig['platform.getTotalStake'],
  },
  'platform.getTx': {
    description: tHTML(`${root}.getTx`),
    avalanche: avalancheJSConfig['platform.getTx'],
  },
  'platform.getTxStatus': {
    description: tHTML(`${root}.getTxStatus`),
    avalanche: avalancheJSConfig['platform.getTxStatus'],
  },
  'platform.getUTXOs': {
    description: tHTML(`${root}.getUTXOs`),
    avalanche: avalancheJSConfig['platform.getUTXOs'],
  },
  'platform.getValidatorsAt': {
    description: tHTML(`${root}.getValidatorsAt`),
    avalanche: avalancheJSConfig['platform.getValidatorsAt'],
  },
  'platform.importAVAX': {
    disabled: true,
    description: tHTML(`${root}.importAVAX`),
    avalanche: avalancheJSConfig['platform.importAVAX'],
  },
  'platform.importKey': {
    disabled: true,
    description: tHTML(`${root}.importKey`),
    avalanche: avalancheJSConfig['platform.importKey'],
  },
  'platform.issueTx': {
    description: tHTML(`${root}.issueTx`),
    avalanche: avalancheJSConfig['platform.issueTx'],
  },
  'platform.listAddresses': {
    disabled: true,
    description: tHTML(`${root}.listAddresses`),
    avalanche: avalancheJSConfig['platform.listAddresses'],
  },
  'platform.sampleValidators': {
    description: tHTML(`${root}.sampleValidators`),
    avalanche: avalancheJSConfig['platform.sampleValidators'],
  },
  'platform.validatedBy': {
    description: tHTML(`${root}.validatedBy`),
    avalanche: avalancheJSConfig['platform.validatedBy'],
  },
  'platform.validates': {
    description: tHTML(`${root}.validates`),
    avalanche: avalancheJSConfig['platform.validates'],
  },
};
