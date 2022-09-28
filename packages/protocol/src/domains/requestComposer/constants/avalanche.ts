export enum AvalancheLibraryID {
  Avalanche = 'avalanche',
}

export const AvalancheLibrary = {
  [AvalancheLibraryID.Avalanche]: 'AvalancheJS',
};

export enum CChainMethod {
  'avax.getAtomicTx' = 'avax.getAtomicTx',
  'avax.export' = 'avax.export',
  'avax.exportAVAX' = 'avax.exportAVAX',
  'avax.exportKey' = 'avax.exportKey',
  'avax.getUTXOs' = 'avax.getUTXOs',
  'avax.import' = 'avax.import',
  'avax.importAVAX' = 'avax.importAVAX',
  'avax.importKey' = 'avax.importKey',
  'avax.issueTx' = 'avax.issueTx',
  'avax.getAtomicTxStatus' = 'avax.getAtomicTxStatus',
}

export enum PChainMethod {
  'platform.addDelegator' = 'platform.addDelegator',
  'platform.addValidator' = 'platform.addValidator',
  'platform.addSubnetValidator' = 'platform.addSubnetValidator',
  'platform.createAddress' = 'platform.createAddress',
  'platform.createBlockchain' = 'platform.createBlockchain',
  'platform.createSubnet' = 'platform.createSubnet',
  'platform.exportAVAX' = 'platform.exportAVAX',
  'platform.exportKey' = 'platform.exportKey',
  'platform.getBalance' = 'platform.getBalance',
  'platform.getBlockchains' = 'platform.getBlockchains',
  'platform.getBlockchainStatus' = 'platform.getBlockchainStatus',
  'platform.getCurrentSupply' = 'platform.getCurrentSupply',
  'platform.getCurrentValidators' = 'platform.getCurrentValidators',
  'platform.getHeight' = 'platform.getHeight',
  'platform.getMaxStakeAmount' = 'platform.getMaxStakeAmount',
  'platform.getMinStake' = 'platform.getMinStake',
  'platform.getPendingValidators' = 'platform.getPendingValidators',
  'platform.getRewardUTXOs' = 'platform.getRewardUTXOs',
  'platform.getStakingAssetID' = 'platform.getStakingAssetID',
  'platform.getSubnets' = 'platform.getSubnets',
  'platform.getStake' = 'platform.getStake',
  'platform.getTimestamp' = 'platform.getTimestamp',
  'platform.getTotalStake' = 'platform.getTotalStake',
  'platform.getTx' = 'platform.getTx',
  'platform.getTxStatus' = 'platform.getTxStatus',
  'platform.getUTXOs' = 'platform.getUTXOs',
  'platform.getValidatorsAt' = 'platform.getValidatorsAt',
  'platform.importAVAX' = 'platform.importAVAX',
  'platform.importKey' = 'platform.importKey',
  'platform.issueTx' = 'platform.issueTx',
  'platform.listAddresses' = 'platform.listAddresses',
  'platform.sampleValidators' = 'platform.sampleValidators',
  'platform.validatedBy' = 'platform.validatedBy',
  'platform.validates' = 'platform.validates',
}
