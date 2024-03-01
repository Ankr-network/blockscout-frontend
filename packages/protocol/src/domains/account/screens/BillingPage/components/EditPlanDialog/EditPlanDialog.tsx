import { t } from '@ankr.com/common';

import {
  UpgradePlanDialog,
  useUpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';

import { EditDialog } from '../EditDialog';
import { PlansButton } from '../PlansButton';
import { SubscriptionEditor } from '../SubscriptionEditor';
import { useEditPlanDialog } from './hooks/useEditPlanDialog';
import { useEditPlanDialogStyles } from './EditPlanDialogStyles';

export interface EditPlanDialogProps {
  isOpened?: boolean;
  onClose: () => void;
}

export const EditPlanDialog = ({
  isOpened = false,
  onClose,
}: EditPlanDialogProps) => {
  const editorProps = useEditPlanDialog(onClose);

  const {
    isOpened: isUpgradeDialogOpened,
    onClose: onUpgradeDialogClose,
    onOpen: onUpgrade,
  } = useUpgradePlanDialog();

  const { classes } = useEditPlanDialogStyles();

  return (
    <EditDialog
      isOpened={isOpened}
      onClose={onClose}
      title={t('account.account-details.edit-plan-dialog.title')}
    >
      <div className={classes.root}>
        <SubscriptionEditor {...editorProps} onUpgrade={onUpgrade} />
        <PlansButton />
      </div>
      <UpgradePlanDialog
        open={isUpgradeDialogOpened}
        onClose={onUpgradeDialogClose}
      />
    </EditDialog>
  );
};
