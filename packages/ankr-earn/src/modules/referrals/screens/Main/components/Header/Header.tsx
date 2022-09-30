import { Box, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import CopyToClipboard from 'react-copy-to-clipboard';

import { t } from 'common';

import { CompleteIcon } from 'uiKit/Icons/CompleteIcon';
import { CopyIcon } from 'uiKit/Icons/CopyIcon';

import { useHeader } from '../../hooks/useHeader';

import { useHeaderStyles } from './useHeaderStyles';

export const Header = (): JSX.Element => {
  const classes = useHeaderStyles();

  const { refLLink, loading, isRefLinkCopied, handleCopyRefLink } = useHeader();

  return (
    <Box className={classes.root}>
      <Typography className={classes.title} component="h1" variant="h3">
        {t('referrals.title')}
      </Typography>

      {loading && (
        <Skeleton className={classes.skeleton} height={48} width={200} />
      )}

      {!loading && (
        <div className={classes.codeWrapper}>
          <Typography className={classes.refCode} color="textSecondary">
            {refLLink}
          </Typography>

          {isRefLinkCopied ? (
            <div className={classes.iconWrap}>
              <CompleteIcon size="xs" />
            </div>
          ) : (
            <CopyToClipboard text={refLLink} onCopy={handleCopyRefLink}>
              <div className={classes.iconWrap}>
                <CopyIcon className={classes.icon} />
              </div>
            </CopyToClipboard>
          )}
        </div>
      )}
    </Box>
  );
};
