import { useDialog } from 'modules/common/hooks/useDialog';
import { useMySubscriptions } from 'domains/account/hooks/useMySubscriptions';

export const useSubscriptionsWidget = () => {
  const { allSubscriptionsAmount: amount, isSubscribed } = useMySubscriptions({
    skipFetching: true,
  });

  const {
    isOpened: isEditDialogOpened,
    onClose: onEditDialogClose,
    onOpen: onEdit,
  } = useDialog();

  return {
    amount,
    isEditDialogOpened,
    isSubscribed,
    onEdit,
    onEditDialogClose,
  };
};
