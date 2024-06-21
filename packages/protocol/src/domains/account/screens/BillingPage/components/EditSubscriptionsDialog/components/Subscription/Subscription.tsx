import { ISubscriptionsItem } from 'multirpc-sdk';

import { SubscriptionEditor } from 'domains/account/screens/BillingPage/components/SubscriptionEditor';

import { TCancelSubscriptionHandler } from '../../hooks/useEditSubscriptionsDialog';
import { useSubscription } from './hooks/useSubscription';

export interface SubscriptionProps {
  onCancel: TCancelSubscriptionHandler;
  subscription: ISubscriptionsItem;
  onOpenSuccessDialog?: () => void;
}

export const Subscription = ({
  onCancel,
  onOpenSuccessDialog = () => {},
  subscription,
}: SubscriptionProps) => {
  const editorProps = useSubscription({ onCancel, subscription });

  return (
    <SubscriptionEditor
      {...editorProps}
      onOpenSuccessDialog={onOpenSuccessDialog}
    />
  );
};
