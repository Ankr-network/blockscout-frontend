import CopyToClipboard from 'react-copy-to-clipboard';
import { Button, ButtonProps } from '@mui/material';
import { Copy } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { TextTooltip } from 'modules/common/components/TextTooltip';
import { useCopyButton } from 'uiKit/CopyButton/hooks/useCopyButton';

import { useCopyButtonStyles } from './useCopyButtonStyles';

export interface ICopyButtonProps {
  text: string;
  size: ButtonProps['size'];
}

export const CopyButton = ({ size, text }: ICopyButtonProps) => {
  const { onCopy, tooltipProps } = useCopyButton();

  const { classes } = useCopyButtonStyles();

  return (
    <TextTooltip {...tooltipProps} title={t('common.copy-message')}>
      <Button className={classes.button} size={size} variant="contained">
        <CopyToClipboard text={text} onCopy={onCopy}>
          <Copy size={20} />
        </CopyToClipboard>
      </Button>
    </TextTooltip>
  );
};
