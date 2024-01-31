import CopyToClipboard from 'react-copy-to-clipboard';
import { Button } from '@mui/material';
import { Copy } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { TextTooltip } from 'modules/common/components/TextTooltip';

import { usePersonalAccountInfoCopyButton } from './hooks/usePersonalAccountInfoCopyButton';
import { usePersonalAccountInfoCopyButtonStyles } from './usePersonalAccountInfoCopyButtonStyles';

export interface PersonalAccountInfoCopyButtonProps {
  address: string;
}

export const PersonalAccountInfoCopyButton = ({
  address,
}: PersonalAccountInfoCopyButtonProps) => {
  const { onCopy, tooltipProps } = usePersonalAccountInfoCopyButton();

  const { classes } = usePersonalAccountInfoCopyButtonStyles();

  return (
    <TextTooltip {...tooltipProps} title={t('common.copy-message')}>
      <Button className={classes.root} variant="text">
        <CopyToClipboard text={address} onCopy={onCopy}>
          <Copy />
        </CopyToClipboard>
      </Button>
    </TextTooltip>
  );
};
