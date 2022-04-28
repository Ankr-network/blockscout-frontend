import React from 'react';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { t } from 'modules/i18n/utils/intl';
import { useStyles } from './EndpointUrlStyles';

export interface EndpointUrlProps {
  url: string;
}

export const EndpointUrl = ({ url }: EndpointUrlProps) => {
  const classes = useStyles();

  return (
    <div className={classes.endpointUrlRoot}>
      <CopyToClipIcon
        className={classes.copyToClip}
        message={t('common.copy-message')}
        size="l"
        text={url}
        textColor="textPrimary"
      />
    </div>
  );
};
