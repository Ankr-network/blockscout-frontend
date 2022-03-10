import React from 'react';
import { Typography } from '@material-ui/core';
import classNames from 'classnames';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './RpcLinksStyles';

interface RpcLinksProps {
  rpcLinks: string[];
  isNervos?: boolean;
}

export const RpcLinks = ({ rpcLinks, isNervos }: RpcLinksProps) => {
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="body2"
        className={classNames(classes.text, classes.textPublic)}
      >
        {t('chain-item.header.public-endpoints', {
          plural: rpcLinks.length > 1 ? t('chain-item.header.plural') : '',
        })}
      </Typography>
      <div className={classes.root}>
        {rpcLinks.map((link, index) => {
          return (
            <div className={classes.section} key={link}>
              <div className={classes.link}>
                <CopyToClipIcon
                  text={link}
                  message={t('common.copy-message')}
                  copyText={t('common.copy-text')}
                  size="l"
                  textColor="textPrimary"
                  className={classes.copyToClip}
                />
              </div>
              {isNervos && (
                <Typography
                  variant="subtitle2"
                  className={classes.label}
                  color="textSecondary"
                >
                  {t(
                    `chain-item.nervos.${
                      index === 0 ? 'eth-based' : 'godwoken-based'
                    }`,
                  )}
                </Typography>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};
