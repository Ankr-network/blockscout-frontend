import { useAppSelector } from 'store/useAppSelector';

import { selectCryptoTxById } from '../store/selectors';

export interface IUseTxByTxIdProps {
  txId: string;
}

export const useTxByTxId = ({ txId }: IUseTxByTxIdProps) => {
  const tx = useAppSelector(state => selectCryptoTxById(state, txId));
  const hasTx = Boolean(tx);

  return { hasTx, tx };
};
