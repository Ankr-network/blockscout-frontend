import { t } from '@ankr.com/common';
import { useMemo } from 'react';

import { CopyToClipIcon } from 'uiKit/CopyToClipIcon';
import { shrinkAddress } from 'modules/common/utils/shrinkAddress';

import { useCopyEndpointToken } from './useCopyEndpointToken';

interface CopyEndpointTokenProps {
  userEndpointToken: string;
}

export const CopyEndpointToken = ({
  userEndpointToken,
}: CopyEndpointTokenProps) => {
  const { classes } = useCopyEndpointToken();

  const copyText = useMemo(
    () => shrinkAddress(userEndpointToken),
    [userEndpointToken],
  );

  return (
    <CopyToClipIcon
      className={classes.endpoint}
      text={userEndpointToken}
      copyText={copyText}
      message={t('common.copy-message')}
      textClassName={classes.text}
      messageClassName={classes.message}
    />
  );
};
