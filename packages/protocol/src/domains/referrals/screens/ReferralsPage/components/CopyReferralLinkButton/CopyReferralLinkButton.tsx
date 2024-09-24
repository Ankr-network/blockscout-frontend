import CopyToClipboard from 'react-copy-to-clipboard';
import { Button } from '@mui/material';
import { Copy } from '@ankr.com/ui';

import { TextTooltip } from 'modules/common/components/TextTooltip';
import { useCopyButton } from 'uiKit/CopyButton/hooks/useCopyButton';
import { useTranslation } from 'modules/i18n/hooks/useTranslation';

import { copyReferralLinkButtonTranslation } from './translation';
import { useCopyReferralLinkButtonStyles } from './useCopyReferralLinkButtonStyles';
import { useReferralLink } from './hooks/useReferralLink';

export interface ICopyReferralLinkButtonProps {
  className?: string;
}

export const CopyReferralLinkButton = ({
  className,
}: ICopyReferralLinkButtonProps) => {
  const { onCopy, tooltipProps } = useCopyButton();

  const { link } = useReferralLink();

  const { classes, cx } = useCopyReferralLinkButtonStyles();
  const { keys, t } = useTranslation(copyReferralLinkButtonTranslation);

  return (
    <CopyToClipboard onCopy={onCopy} text={link}>
      <TextTooltip {...tooltipProps} title={t(keys.copied)}>
        <Button
          className={cx(classes.root, className)}
          color="primary"
          size="small"
          startIcon={<Copy size={20} />}
          variant="outlined"
        >
          {t(keys.text)}
        </Button>
      </TextTooltip>
    </CopyToClipboard>
  );
};
