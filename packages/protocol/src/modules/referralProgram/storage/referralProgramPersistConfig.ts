import storage from 'redux-persist/lib/storage';
import { PersistConfig } from 'redux-persist';

import { IReferralProgramSlice } from '../types';

type ReferralProgramPersistConfig = PersistConfig<IReferralProgramSlice>;

export const referralProgramPersistConfig: ReferralProgramPersistConfig = {
  key: 'referralProgram',
  storage,
};
