import { Divider } from '@mui/material';

import {
  ReferralCodeButton,
  useReferralCodeButton,
} from 'modules/referralProgram/components/ReferralCodeButton';
import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { useAdditionalOptionsStyles } from './useAdditionalOptionsStyles';

export interface IAdditionalOptionsProps {
  className?: string;
  handleSidebarClose?: () => void;
}

export const AdditionalOptions = ({
  className,
  handleSidebarClose,
}: IAdditionalOptionsProps) => {
  const isMobilde = useIsSMDown();

  const { hasReferralCodeButton, referralCodeButtonProps } =
    useReferralCodeButton({ onReferralCodeDialogOpen: handleSidebarClose });

  const { classes, cx } = useAdditionalOptionsStyles();

  const referralCodeButton = (
    <ReferralCodeButton
      className={classes.referralCodeButton}
      {...referralCodeButtonProps}
    />
  );

  if (!isMobilde) {
    return null;
  }

  if (!hasReferralCodeButton) {
    // The button should not be unmounted to keep the dialogs inside mounted
    return referralCodeButton;
  }

  return (
    <div className={cx(classes.root, className)}>
      <Divider />
      {referralCodeButton}
    </div>
  );
};
