import { t } from '@ankr.com/common';

import { WhiteListItem } from 'domains/projects/types';

const intlkey = 'projects.add-whitelist-dialog.titles';

export const getTitle = (
  isEditingWhitelistDialog: boolean,
  type?: WhiteListItem,
) => {
  if (isEditingWhitelistDialog) return t(`${intlkey}.edit`);

  switch (type) {
    case WhiteListItem.address:
      return t(`${intlkey}.add-smart-contract`);
    case WhiteListItem.referer:
      return t(`${intlkey}.add-domain`);
    case WhiteListItem.ip:
      return t(`${intlkey}.add-ip`);
    case WhiteListItem.all:
    default:
      return t(`${intlkey}.add`);
  }
};
