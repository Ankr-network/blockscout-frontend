import { ISubscriptionsItem } from 'multirpc-sdk';

import { SubscriptionEditor } from 'domains/account/screens/BillingPage/components/SubscriptionEditor';

import { useSubscription } from './hooks/useSubscription';

export interface SubscriptionProps {
  onCancel?: () => void;
  onUpgrade: () => void;
  subscription: ISubscriptionsItem;
}

export const Subscription = ({
  onCancel,
  onUpgrade,
  subscription,
}: SubscriptionProps) => {
  const editorProps = useSubscription({ onCancel, subscription });

  return <SubscriptionEditor {...editorProps} onUpgrade={onUpgrade} />;
};
