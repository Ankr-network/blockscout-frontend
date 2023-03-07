import { t } from '@ankr.com/common';
import Box from '@material-ui/core/Box/Box';
import { ReactNode } from 'react';

import { ErrorMessage } from 'modules/common/components/ErrorMessage';
import { DefaultLayout } from 'modules/layout/components/DefautLayout';
import { Container } from 'uiKit/Container';
import { QueryLoadingAbsolute } from 'uiKit/QueryLoading';

import { UpgradeInfo } from './components/UpgradeInfo/UpgradeInfo';
import { useMigrationGuard } from './hooks/useMigrationGuard';

const CONTAINER_WIDTH = 760;

export interface IMigrationGuardProps {
  children: ReactNode;
}

export const MigrationGuard = ({
  children,
}: IMigrationGuardProps): JSX.Element => {
  const {
    isMigrated,
    isMigratedError,
    isMigratedDataLoading,
    isMigrateDelegatorLoading,
    isMigratedErrorData,
    onMigrateButtonClick,
    refetchIsMigrated,
  } = useMigrationGuard();

  if (isMigratedDataLoading) {
    return (
      <DefaultLayout>
        <QueryLoadingAbsolute />
      </DefaultLayout>
    );
  }

  if (isMigratedError) {
    return (
      <DefaultLayout verticalAlign="center">
        <Box component="section" py={5}>
          <Container maxWidth={CONTAINER_WIDTH}>
            <ErrorMessage
              text={isMigratedErrorData}
              title={t('error.some')}
              onClick={refetchIsMigrated}
            />
          </Container>
        </Box>
      </DefaultLayout>
    );
  }

  if (isMigrated) {
    return <DefaultLayout>{children}</DefaultLayout>;
  }

  return (
    <DefaultLayout verticalAlign="center">
      <Box component="section" py={5}>
        <Container maxWidth={CONTAINER_WIDTH}>
          <UpgradeInfo
            isLoading={isMigrateDelegatorLoading}
            onClick={onMigrateButtonClick}
          />
        </Container>
      </Box>
    </DefaultLayout>
  );
};
