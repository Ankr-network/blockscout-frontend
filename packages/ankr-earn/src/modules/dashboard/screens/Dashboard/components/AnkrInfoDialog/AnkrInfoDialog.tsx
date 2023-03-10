import { t, tHTML } from '@ankr.com/common';

import { configFromEnv } from 'modules/api/config';
import { DOCS_ANKR_TOKEN_STAKING_LINK } from 'modules/common/const';
import { TokenInfoDialog } from 'modules/dashboard/components/TokenInfoDialog';

const { contractConfig } = configFromEnv();

interface IAnkrInfoDialogProps {
  onClose: VoidFunction;
  isOpened: boolean;
}

export const AnkrInfoDialog = ({
  onClose,
  isOpened,
}: IAnkrInfoDialogProps): JSX.Element => {
  return (
    <TokenInfoDialog
      description={tHTML('dashboard.token-info.ANKR')}
      moreHref={DOCS_ANKR_TOKEN_STAKING_LINK}
      open={isOpened}
      tokenAddress={contractConfig.ankrToken}
      tokenName={t('unit.ankr')}
      onClose={onClose}
    />
  );
};
