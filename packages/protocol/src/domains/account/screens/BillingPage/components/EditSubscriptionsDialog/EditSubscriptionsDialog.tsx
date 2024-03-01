import { t } from '@ankr.com/common';
import Scrollbars from 'react-custom-scrollbars';

import {
  ContentType,
  UpgradePlanDialog,
} from 'modules/common/components/UpgradePlanDialog';
import { TopUpCurrency } from 'modules/common/components/UpgradePlanDialog/components/TopUpForm/types';

import { EditDialog } from '../EditDialog';
import { PlansButton } from '../PlansButton';
import { Subscription } from './components/Subscription';
import { useEditSubscriptionsDialogStyles } from './EditSubscriptionsDialogStyles';
import { useEditSubscriptionsDialog } from './hooks/useEditSubscriptionsDialog';

export interface EditSubscriptionsDialogProps {
  isOpened?: boolean;
  onClose: () => void;
}

const DIALOG_MARGIN = 32;
const DIALOG_PADDING = 40;
const DIALOG_HEADER = 70;
const DIALOG_OFFSET = DIALOG_MARGIN * 2 + DIALOG_PADDING * 2 + DIALOG_HEADER;

const authoHeightMax = `calc(100vh - ${DIALOG_OFFSET}px)`;

export const EditSubscriptionsDialog = ({
  isOpened,
  onClose,
}: EditSubscriptionsDialogProps) => {
  const {
    isUpgradeDialogOpened,
    onCancelSubscription,
    onUpgradeDialogClose,
    onUpgradeSubscription,
    subscriptions,
  } = useEditSubscriptionsDialog(onClose);

  const { classes } = useEditSubscriptionsDialogStyles();

  return (
    <EditDialog
      isOpened={isOpened}
      onClose={onClose}
      title={t('account.account-details.edit-subscriptions-dialog.title')}
    >
      <Scrollbars autoHeight autoHeightMax={authoHeightMax}>
        <div className={classes.root}>
          <div className={classes.subscriptions}>
            {subscriptions.map(subscription => (
              <Subscription
                key={subscription.id}
                onCancel={onCancelSubscription}
                onUpgrade={onUpgradeSubscription}
                subscription={subscription}
              />
            ))}
          </div>
          <PlansButton />
        </div>
      </Scrollbars>
      <UpgradePlanDialog
        currency={TopUpCurrency.USD}
        defaultState={ContentType.TOP_UP}
        onClose={onUpgradeDialogClose}
        open={isUpgradeDialogOpened}
      />
    </EditDialog>
  );
};
