import { ContentType, Item } from '../types';
import { DIALOG_BREAKDOWN } from '../const';
import { IDialogProps } from 'uiKit/Dialog';
import { getContent } from '../utils/getContent';
import { useDialogTitle } from './useDialogTitle';
import { useHasBreakdown } from 'uiKit/Theme/useTheme';
import { usePremiumUpgradeHandler } from './usePremiumUpgradeHandler';

const getDefaultMaxWidth = (hasBreakdown: boolean) =>
  hasBreakdown ? 600 : 980;

export interface DialogPropsParams {
  contentType: ContentType;
  isV2?: boolean;
  items: Item[];
  onClose: () => void;
  onTrack?: () => void;
  premiumUpgradeHandler: ReturnType<
    typeof usePremiumUpgradeHandler
  >['premiumUpgradeHandler'];
  pricingLink: string;
}

export const useDialogProps = ({
  contentType,
  isV2,
  items,
  onClose,
  onTrack,
  premiumUpgradeHandler,
  pricingLink,
}: DialogPropsParams): Omit<IDialogProps, 'open'> => {
  const hasBreakdown = useHasBreakdown(DIALOG_BREAKDOWN);

  const { resetTitle, title } = useDialogTitle(contentType);

  return {
    children: getContent({
      contentType,
      isV2,
      items,
      onTrack,
      pricingLink,
      premiumUpgradeHandler,
      resetTitle,
    }),
    maxPxWidth:
      contentType === ContentType.DEFAULT
        ? getDefaultMaxWidth(hasBreakdown)
        : 600,
    onClose,
    title,
  };
};
