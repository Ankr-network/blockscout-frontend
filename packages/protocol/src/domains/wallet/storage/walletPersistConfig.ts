import { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { IWalletSlice } from '../store/walletSlice';

export const walletPersistConfig: PersistConfig<IWalletSlice> = {
  key: 'wallet',
  storage,
};
