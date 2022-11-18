import { Web3KeyReadProvider } from './Web3KeyReadProvider';
import { Web3KeyWriteProvider } from './Web3KeyWriteProvider';

export function isWriteProvider(
  obj: Web3KeyReadProvider | Web3KeyWriteProvider,
): obj is Web3KeyWriteProvider {
  return !!(obj as Web3KeyWriteProvider).currentAccount;
}
