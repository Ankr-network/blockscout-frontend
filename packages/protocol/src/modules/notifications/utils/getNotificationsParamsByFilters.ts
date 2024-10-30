import { EAdditionalNotificationsFilter, ENotificationsFilter } from '../const';

interface IGetNotificationsParamsByFiltersArgs {
  filter: ENotificationsFilter;
}

export const getNotificationsParamsByFilters = ({
  filter,
}: IGetNotificationsParamsByFiltersArgs) => {
  if (filter === EAdditionalNotificationsFilter.ALL) {
    return undefined;
  }

  if (filter === EAdditionalNotificationsFilter.UNREAD) {
    return {
      only_unseen: true,
    };
  }

  return {
    category: filter,
  };
};
