import { ECurrency } from 'modules/payments/types';
import { IDialogProps } from 'uiKit/Dialog';
import { SIGNUP_DIALOG_WIDTH } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';
import { useHasBreakdown } from 'uiKit/Theme/useTheme';

import { ContentType, Plan } from '../types';
import { DIALOG_BREAKDOWN } from '../const';
import { getContent } from '../utils/getContent';
import { useDialogTitle } from './useDialogTitle';

const LARGE_WIDTH = 1200;

const getDefaultMaxWidth = (hasBreakdown: boolean) =>
  hasBreakdown ? SIGNUP_DIALOG_WIDTH : LARGE_WIDTH;

export interface DialogPropsParams {
  contentType: ContentType;
  currency?: ECurrency;
  defaultState?: ContentType;
  enterpriseUpgradeHandler: () => void;
  freeUpgradeHandler: () => void;
  onClose: () => void;
  onSubmitContactForm: () => void;
  plans: Plan[];
  premiumUpgradeHandler: () => void;
}

export const useDialogProps = ({
  contentType,
  currency,
  defaultState,
  enterpriseUpgradeHandler,
  freeUpgradeHandler,
  onClose,
  onSubmitContactForm,
  plans,
  premiumUpgradeHandler,
}: DialogPropsParams): Omit<IDialogProps, 'open'> => {
  const hasBreakdown = useHasBreakdown(DIALOG_BREAKDOWN);

  const { resetTitle, title } = useDialogTitle(defaultState || contentType);

  return {
    children: getContent({
      contentType: defaultState ?? contentType,
      currency,
      enterpriseUpgradeHandler,
      freeUpgradeHandler,
      onClose,
      onSubmitContactForm,
      plans,
      premiumUpgradeHandler,
      resetTitle,
    }),
    maxPxWidth:
      contentType === ContentType.DEFAULT
        ? getDefaultMaxWidth(hasBreakdown)
        : SIGNUP_DIALOG_WIDTH,
    onClose,
    title,
  };
};
