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
