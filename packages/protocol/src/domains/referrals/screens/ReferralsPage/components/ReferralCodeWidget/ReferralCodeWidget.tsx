import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { ValueBox } from './components/ValueBox';
import { Widget } from '../Widget';
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
    <Widget className={cx(classes.root, className)}>
      <ValueBox
        copyValue={link}
        title={t(keys.referralLinkTitle)}
        value={truncatedLink}
        isLoading={isLoading}
      />
      <ValueBox
        title={t(keys.referralCodeTitle)}
        value={code}
        isLoading={isLoading}
      />
    </Widget>
  );
};
