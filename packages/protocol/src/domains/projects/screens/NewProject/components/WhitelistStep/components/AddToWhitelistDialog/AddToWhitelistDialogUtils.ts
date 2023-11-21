import { UserEndpointTokenMode } from 'multirpc-sdk';
import { t } from '@ankr.com/common';

const intlkey = 'projects.add-whitelist-dialog.titles';

export const getTitle = (
  isEditingWhitelistDialog: boolean,
  type?: UserEndpointTokenMode,
) => {
  if (isEditingWhitelistDialog) return t(`${intlkey}.edit`);

  switch (type) {
    case UserEndpointTokenMode.ADDRESS:
      return t(`${intlkey}.add-smart-contract`);
    case UserEndpointTokenMode.REFERER:
      return t(`${intlkey}.add-domain`);
    case UserEndpointTokenMode.IP:
      return t(`${intlkey}.add-ip`);
    case UserEndpointTokenMode.ALL:
    default:
      return t(`${intlkey}.add`);
  }
};
