import { Divider } from '@mui/material';

import {
  ReferralCodeButton,
  useReferralCodeButton,
} from 'modules/referralProgram/components/ReferralCodeButton';
import { useIsSMDown } from 'uiKit/Theme/useTheme';

import { useAdditionalOptionsStyles } from './useAdditionalOptionsStyles';

export interface IAdditionalOptionsProps {
  className?: string;
}

export const AdditionalOptions = ({ className }: IAdditionalOptionsProps) => {
  const isMobilde = useIsSMDown();

  const { hasReferralCodeButton, referralCodeButtonProps } =
    useReferralCodeButton();

  const hasAdditionalOptions = isMobilde && hasReferralCodeButton;

  const { classes, cx } = useAdditionalOptionsStyles();

  if (!hasAdditionalOptions) {
    return null;
  }

  return (
    <div className={cx(classes.root, className)}>
      <Divider />
      <ReferralCodeButton
        className={classes.referralCodeButton}
        {...referralCodeButtonProps}
      />
    </div>
  );
};
