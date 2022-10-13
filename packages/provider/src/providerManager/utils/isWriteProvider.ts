import { Web3KeyWriteProvider, Web3KeyReadProvider } from 'common';

export function isWriteProvider(
  obj: Web3KeyReadProvider | Web3KeyWriteProvider,
): obj is Web3KeyWriteProvider {
  return !!(obj as Web3KeyWriteProvider).currentAccount;
}
