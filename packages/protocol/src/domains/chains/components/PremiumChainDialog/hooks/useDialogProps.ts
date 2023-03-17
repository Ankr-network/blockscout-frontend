import { ContentType, Item } from '../types';
import { DIALOG_BREAKDOWN } from '../const';
import { IDialogProps } from 'uiKit/Dialog';
import { getContent } from '../utils/getContent';
import { useDialogTitle } from './useDialogTitle';
import { useHasBreakdown } from 'uiKit/Theme/useTheme';
import { usePremiumUpgradeHandler } from './usePremiumUpgradeHandler';
import { SIGNUP_DIALOG_WIDTH } from 'domains/auth/components/ConnectButton/UnconnectedButton/SignupDialog';

const LARGE_WIDTH = 1200;

const getDefaultMaxWidth = (hasBreakdown: boolean) =>
  hasBreakdown ? SIGNUP_DIALOG_WIDTH : LARGE_WIDTH;

export interface DialogPropsParams {
  contentType: ContentType;
  items: Item[];
  onClose: () => void;
  onTrack?: () => void;
  premiumUpgradeHandler: ReturnType<typeof usePremiumUpgradeHandler>;
}

export const useDialogProps = ({
  contentType,
  items,
  onClose,
  onTrack,
  premiumUpgradeHandler,
}: DialogPropsParams): Omit<IDialogProps, 'open'> => {
  const hasBreakdown = useHasBreakdown(DIALOG_BREAKDOWN);

  const { resetTitle, title } = useDialogTitle(contentType);

  return {
    children: getContent({
      contentType,
      items,
      onTrack,
      premiumUpgradeHandler,
      resetTitle,
      onClose,
    }),
    maxPxWidth:
      contentType === ContentType.DEFAULT
        ? getDefaultMaxWidth(hasBreakdown)
        : SIGNUP_DIALOG_WIDTH,
    onClose,
    title,
  };
};
