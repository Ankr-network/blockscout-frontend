import { Box } from '@mui/material';
import { OverlaySpinner } from '@ankr.com/ui';

import { Placeholder } from 'modules/common/components/Placeholder';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ValueBox } from './components/ValueBox';
import { referralCodeWidgetTranslation } from './translation';
import { useReferralCodeWidgetStyles } from './useReferralCodeWidgetStyles';

export interface IReferralCodeWidgetProps {
  className?: string;
  code: string;
  isLoading?: boolean;
  link: string;
  truncatedLink: string;
}

export const ReferralCodeWidget = ({
  className,
  code,
  isLoading = false,
  link,
  truncatedLink,
}: IReferralCodeWidgetProps) => {
  const { classes, cx } = useReferralCodeWidgetStyles();
  const { keys, t } = useTranslation(referralCodeWidgetTranslation);

  return (
    <Box className={cx(classes.root, className)}>
      <Placeholder hasPlaceholder={isLoading} placeholder={<OverlaySpinner />}>
        <ValueBox
          copyValue={link}
          title={t(keys.referralLinkTitle)}
          value={truncatedLink}
        />
        <ValueBox title={t(keys.referralCodeTitle)} value={code} />
      </Placeholder>
    </Box>
  );
};
