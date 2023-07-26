import CopyToClipboard from 'react-copy-to-clipboard';
import { Button } from '@mui/material';
import { Copy } from '@ankr.com/ui';
import { t } from '@ankr.com/common';

import { useCopyToClip } from 'uiKit/CopyToClipIcon/CopyToClipIconUtils';

import { useStyles } from './CopyCodeButtonStyles';
import { root } from '../../const';

export interface CopyCodeButtonProps {
  text?: string;
  code: string;
}

const copyCodeButton = `${root}.connection-snippet.copy-code-button`;

export const CopyCodeButton = ({ code, text }: CopyCodeButtonProps) => {
  const [isCopied, setIsCopied] = useCopyToClip();

  const { classes } = useStyles();

  return (
    <CopyToClipboard text={code} onCopy={setIsCopied}>
      <Button
        className={classes.copyCodeButton}
        startIcon={<Copy />}
        variant="outlined"
      >
        {isCopied
          ? t(`${copyCodeButton}.copy-message`)
          : text || t(`${copyCodeButton}.label`)}
      </Button>
    </CopyToClipboard>
  );
};
