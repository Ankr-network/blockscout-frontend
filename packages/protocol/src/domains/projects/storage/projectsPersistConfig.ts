import storage from 'redux-persist/lib/storage';

export const PROJECTS_PERSIST_KEY = 'projects';

export const projectsPersistConfig = {
  key: PROJECTS_PERSIST_KEY,
  storage,
};
