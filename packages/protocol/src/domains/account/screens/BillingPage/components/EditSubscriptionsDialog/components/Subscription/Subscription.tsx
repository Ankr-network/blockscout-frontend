import { ISubscriptionsItem } from 'multirpc-sdk';

import { SubscriptionEditor } from 'domains/account/screens/BillingPage/components/SubscriptionEditor';

import { useSubscription } from './hooks/useSubscription';

export interface SubscriptionProps {
  onCancel: (expiresAt: string, isDeal: boolean) => void;
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
