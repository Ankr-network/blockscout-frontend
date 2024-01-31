import storage from 'redux-persist/lib/storage';

export const NEW_USER_GROUP_KEY = 'newUserGroup';

export const newUserGroupPersistConfig = {
  key: NEW_USER_GROUP_KEY,
  storage,
};
