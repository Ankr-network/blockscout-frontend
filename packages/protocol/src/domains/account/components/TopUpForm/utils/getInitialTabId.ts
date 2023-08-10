import { TopUpFormTabID } from '../constants';

export interface InitialTabIdParams {
  hasAnkrTab: boolean;
  initialTabId?: TopUpFormTabID;
}

export const getInitialTabId = ({
  hasAnkrTab,
  initialTabId,
}: InitialTabIdParams) => {
  const defaultTabId = hasAnkrTab ? TopUpFormTabID.ANKR : TopUpFormTabID.USD;

  return initialTabId ?? defaultTabId;
};
