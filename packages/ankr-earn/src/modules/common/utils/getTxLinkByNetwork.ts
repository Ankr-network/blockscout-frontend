import { transactionHistoryUrlsByNetwork } from '../const';

export function getTxLinkByNetwork(txHash: string, network: number): string {
  return (transactionHistoryUrlsByNetwork[network] || '').replace(
    '{value}',
    txHash,
  );
}
