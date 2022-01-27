import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './RpcLinksStyles';

interface RpcLinksProps {
  rpcLinks: string[];
}

export const RpcLinks = ({ rpcLinks }: RpcLinksProps) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="body2"
        className={classNames(classes.text, classes.textPublic)}
      >
        {t('chain-item.header.right')}
      </Typography>
      <div className={classes.root}>
        {rpcLinks.map(link => {
          return (
            <React.Fragment key={link}>
              <CopyToClipIcon
                text={link}
                message={t('common.copy-message')}
                copyText={t('common.copy-text')}
                size="l"
                textColor="textPrimary"
                className={classes.copyToClip}
              />
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};
