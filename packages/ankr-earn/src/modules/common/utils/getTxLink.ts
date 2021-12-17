//import { StkrSdk } from 'modules/api';

export function getTxLink(txHash?: string): string {
  if (typeof txHash !== 'string') {
    return '';
  }

  return '';

  /*
  try {
    return StkrSdk.getForEnv().createExplorerLink(txHash);
  } catch {
    return '';
  }*/
}
