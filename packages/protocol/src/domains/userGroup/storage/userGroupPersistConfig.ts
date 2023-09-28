import storage from 'redux-persist/lib/storage';

import { USER_GROUP_ACTION_NAME } from '../store';

export const userGroupPersistConfig = {
  key: USER_GROUP_ACTION_NAME,
  storage,
};
