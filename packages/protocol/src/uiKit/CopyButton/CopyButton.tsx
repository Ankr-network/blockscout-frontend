import CopyToClipboard from 'react-copy-to-clipboard';
import { IconButton, IconButtonOwnProps } from '@mui/material';
import { Copy } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { TextTooltip } from 'modules/common/components/TextTooltip';

import { useCopyButton } from './hooks/useCopyButton';
import { useCopyButtonStyles } from './useCopyButtonStyles';

export interface CopyButtonProps {
  text: string;
  size: IconButtonOwnProps["size"];
  className?: string;
}

export const CopyButton = ({ text, size, className }: CopyButtonProps) => {
  const { onCopy, tooltipProps } = useCopyButton();

  const { classes, cx } = useCopyButtonStyles();

  return (
    <TextTooltip {...tooltipProps} title={t('common.copy-message')}>
      <IconButton size={size} className={cx(classes.root, className)}>
        <CopyToClipboard text={text} onCopy={onCopy}>
          <Copy />
        </CopyToClipboard>
      </IconButton>
    </TextTooltip>
  );
};
