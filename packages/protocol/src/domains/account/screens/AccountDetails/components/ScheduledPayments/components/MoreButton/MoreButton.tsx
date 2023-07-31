import { t } from '@ankr.com/common';

import { EditSubscriptionsDialog } from 'domains/account/screens/AccountDetails/components/EditSubscriptionsDialog';
import { useDialog } from 'modules/common/hooks/useDialog';

import { Chip } from '../Chip';

export interface MoreButtonProps {
  subscriptionsCount: number;
}

const intlKey = 'account.account-details.scheduled-payments.more-button';

export const MoreButton = ({ subscriptionsCount }: MoreButtonProps) => {
  const { isOpened, onClose, onOpen } = useDialog();

  return (
    <>
      <Chip label={t(intlKey, { subscriptionsCount })} onClick={onOpen} />
      <EditSubscriptionsDialog isOpened={isOpened} onClose={onClose} />
    </>
  );
};
